"use strict";

const utils = require("@iobroker/adapter-core");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { EventSource } = require("eventsource");

class Ntfy extends utils.Adapter {
  /**
   * @param {Partial<utils.AdapterOptions>} [options] Options for the adapter
   */
  constructor(options) {
    super({
      ...options,
      name: "ntfy-sh",
    });
    this.on("ready", this.onReady.bind(this));
    this.on("message", this.onMessage.bind(this));
    this.on("unload", this.onUnload.bind(this));

    this.subscriptions = new Map();

    this.statsInterval = null;

    this.versionCheckInterval = null;
  }

  /**
   * Is called when databases are connected and adapter received configuration.
   */
  async onReady() {
    this.log.debug("ntfy-sh adapter starting...");

    // Validate configuration
    if (!this.config.url) {
      this.log.warn(
        "ntfy Server URL is not configured. Using default: https://ntfy.sh",
      );
    } else {
      this.log.debug(`Using ntfy server URL: ${this.config.url}`);
    }

    // Validate authentication configuration
    if (this.config.authType === "user") {
      if (!this.config.user || !this.config.pass) {
        this.log.warn(
          "Basic authentication is selected but username or password is missing.",
        );
      }
    } else if (this.config.authType === "token") {
      if (!this.config.token) {
        this.log.warn(
          "Token authentication is selected but no access token is configured.",
        );
      }
    }

    // Create object structure
    this.log.debug("Creating object structure...");
    await this.createObjectStructure();
    this.log.debug("Object structure created successfully.");

    // Set connection state to true initially
    await this.setStateAsync("info.connection", true, true);

    // Subscribe to configured topics
    this.log.debug("Subscribing to configured topics...");
    await this.subscribeToTopics();

    // Fetch account statistics
    this.log.debug("Fetching account statistics...");
    await this.fetchAccountStats();

    // Start periodic stats update (every 15 minutes like HA)
    this.statsInterval = setInterval(
      () => this.fetchAccountStats(),
      15 * 60 * 1000,
    );

    // Check server version
    this.log.debug("Checking server version...");
    await this.checkServerVersion();

    // Start periodic version check (every 6 hours)
    this.versionCheckInterval = setInterval(
      () => this.checkServerVersion(),
      6 * 60 * 60 * 1000,
    );

    this.log.info("ntfy-sh adapter started. Waiting for messages...");
  }

  /**
   * Create the object structure for states
   */
  async createObjectStructure() {
    // Info states
    await this.setObjectNotExistsAsync("info.connection", {
      type: "state",
      common: {
        name: "Connection status",
        type: "boolean",
        role: "indicator.connected",
        read: true,
        write: false,
        def: false,
      },
      native: {},
    });

    await this.setObjectNotExistsAsync("info.serverVersion", {
      type: "state",
      common: {
        name: "ntfy server version",
        type: "string",
        role: "text",
        read: true,
        write: false,
        def: "",
      },
      native: {},
    });

    await this.setObjectNotExistsAsync("info.updateAvailable", {
      type: "state",
      common: {
        name: "Server update available",
        type: "boolean",
        role: "indicator",
        read: true,
        write: false,
        def: false,
      },
      native: {},
    });

    await this.setObjectNotExistsAsync("info.latestVersion", {
      type: "state",
      common: {
        name: "Latest ntfy server version available",
        type: "string",
        role: "text",
        read: true,
        write: false,
        def: "",
      },
      native: {},
    });

    // Account statistics
    const statsStates = [
      // Message stats
      {
        id: "stats.messages.published",
        name: "Messages published today",
        type: "number",
        role: "value",
      },
      {
        id: "stats.messages.remaining",
        name: "Messages remaining",
        type: "number",
        role: "value",
      },
      {
        id: "stats.messages.limit",
        name: "Messages usage limit",
        type: "number",
        role: "value",
      },
      {
        id: "stats.messages.expiryDuration",
        name: "Messages expiry duration (seconds)",
        type: "number",
        role: "value",
        unit: "s",
      },
      // Email stats
      {
        id: "stats.emails.sent",
        name: "Emails sent today",
        type: "number",
        role: "value",
      },
      {
        id: "stats.emails.remaining",
        name: "Emails remaining",
        type: "number",
        role: "value",
      },
      {
        id: "stats.emails.limit",
        name: "Email usage limit",
        type: "number",
        role: "value",
      },
      // Phone call stats
      {
        id: "stats.calls.made",
        name: "Phone calls made today",
        type: "number",
        role: "value",
      },
      {
        id: "stats.calls.remaining",
        name: "Phone calls remaining",
        type: "number",
        role: "value",
      },
      {
        id: "stats.calls.limit",
        name: "Phone calls usage limit",
        type: "number",
        role: "value",
      },
      // Reserved topics
      {
        id: "stats.reservations.count",
        name: "Reserved topics",
        type: "number",
        role: "value",
      },
      {
        id: "stats.reservations.remaining",
        name: "Reserved topics remaining",
        type: "number",
        role: "value",
      },
      {
        id: "stats.reservations.limit",
        name: "Reserved topics limit",
        type: "number",
        role: "value",
      },
      // Attachment stats
      {
        id: "stats.attachments.storage",
        name: "Attachment storage used (bytes)",
        type: "number",
        role: "value",
        unit: "bytes",
      },
      {
        id: "stats.attachments.storageRemaining",
        name: "Attachment storage remaining (bytes)",
        type: "number",
        role: "value",
        unit: "bytes",
      },
      {
        id: "stats.attachments.storageLimit",
        name: "Attachment storage limit (bytes)",
        type: "number",
        role: "value",
        unit: "bytes",
      },
      {
        id: "stats.attachments.expiryDuration",
        name: "Attachment expiry duration (seconds)",
        type: "number",
        role: "value",
        unit: "s",
      },
      {
        id: "stats.attachments.fileSizeLimit",
        name: "Attachment file size limit (bytes)",
        type: "number",
        role: "value",
        unit: "bytes",
      },
      {
        id: "stats.attachments.bandwidthLimit",
        name: "Attachment bandwidth limit (bytes)",
        type: "number",
        role: "value",
        unit: "bytes",
      },
      // Account
      {
        id: "stats.account.tier",
        name: "Subscription tier",
        type: "string",
        role: "text",
      },
    ];

    for (const state of statsStates) {
      await this.setObjectNotExistsAsync(state.id, {
        type: "state",
        common: {
          name: state.name,
          type: state.type,
          role: state.role,
          read: true,
          write: false,
          unit: state.unit || undefined,
          def: state.type === "number" ? 0 : "",
        },
        native: {},
      });
    }

    // Create topic folder structure for subscribed topics
    const topics = this.config.topics || [];
    for (const topicConfig of topics) {
      const topicName = topicConfig.topic || topicConfig;
      if (topicName) {
        await this.createTopicStates(topicName);
      }
    }
  }

  /**
   * Create states for a subscribed topic.
   *
   * @param {string} topicName - The topic name
   */
  async createTopicStates(topicName) {
    const safeName = this.sanitizeTopicName(topicName);

    await this.setObjectNotExistsAsync(`topics.${safeName}`, {
      type: "channel",
      common: {
        name: topicName,
      },
      native: {},
    });

    const topicStates = [
      {
        id: `topics.${safeName}.lastMessage`,
        name: "Last received message",
        type: "string",
        role: "text",
      },
      {
        id: `topics.${safeName}.lastTitle`,
        name: "Last received title",
        type: "string",
        role: "text",
      },
      {
        id: `topics.${safeName}.lastPriority`,
        name: "Last received priority",
        type: "number",
        role: "value",
      },
      {
        id: `topics.${safeName}.lastTags`,
        name: "Last received tags",
        type: "string",
        role: "text",
      },
      {
        id: `topics.${safeName}.lastClick`,
        name: "Last received click URL",
        type: "string",
        role: "url",
      },
      {
        id: `topics.${safeName}.lastAttachmentUrl`,
        name: "Last received attachment URL",
        type: "string",
        role: "url",
      },
      {
        id: `topics.${safeName}.lastTimestamp`,
        name: "Last message timestamp",
        type: "number",
        role: "date",
      },
      {
        id: `topics.${safeName}.lastMessageId`,
        name: "Last message ID",
        type: "string",
        role: "text",
      },
      {
        id: `topics.${safeName}.lastJson`,
        name: "Last received full JSON",
        type: "string",
        role: "json",
      },
      {
        id: `topics.${safeName}.subscribed`,
        name: "Subscription active",
        type: "boolean",
        role: "indicator",
      },
    ];

    for (const state of topicStates) {
      const defValue =
        state.type === "number" ? 0 : state.type === "boolean" ? false : "";
      await this.setObjectNotExistsAsync(state.id, {
        type: "state",
        common: {
          name: state.name,
          type: state.type,
          role: state.role,
          read: true,
          write: false,
          def: defValue,
        },
        native: {},
      });
    }
  }

  /**
   * Sanitize topic name for use as state ID.
   *
   * @param {string} topicName - The topic name
   * @returns {string} Sanitized name
   */
  sanitizeTopicName(topicName) {
    return topicName.replace(/[^a-zA-Z0-9_-]/g, "_");
  }

  /**
   * Get authentication headers.
   *
   * @returns {object} Headers object with auth
   */
  getAuthHeaders() {
    const headers = {};
    if (
      this.config.authType === "user" &&
      this.config.user &&
      this.config.pass
    ) {
      const credentials = `${this.config.user}:${this.config.pass}`;
      headers["Authorization"] =
        `Basic ${Buffer.from(credentials).toString("base64")}`;
    } else if (this.config.authType === "token" && this.config.token) {
      headers["Authorization"] = `Bearer ${this.config.token}`;
    }
    return headers;
  }

  /**
   * Subscribe to configured topics via SSE (Server-Sent Events).
   */
  async subscribeToTopics() {
    this.log.debug("Starting topic subscription process...");
    const topics = this.config.topics || [];
    this.log.debug(
      `Found ${topics.length} topics to subscribe to: ${JSON.stringify(topics)}`,
    );

    const url = (this.config.url || "https://ntfy.sh").replace(/\/+$/, "");

    for (const topicConfig of topics) {
      const topicName = topicConfig.topic || topicConfig;
      if (!topicName) {
        continue;
      }

      try {
        this.log.debug(`Attempting to subscribe to topic: ${topicName}`);
        await this.subscribeToTopic(url, topicName);
        this.log.debug(`Successfully subscribed to topic: ${topicName}`);
      } catch (error) {
        this.log.error(
          `Failed to subscribe to topic "${topicName}": ${error.message}`,
        );
      }
    }
  }

  /**
   * Subscribe to a single topic via SSE.
   *
   * @param {string} url - Server URL
   * @param {string} topicName - Topic name
   */
  async subscribeToTopic(url, topicName) {
    this.log.debug(`Creating SSE subscription for topic "${topicName}"...`);
    const safeName = this.sanitizeTopicName(topicName);
    const sseUrl = `${url}/${encodeURIComponent(topicName)}/sse`;
    this.log.debug(`SSE URL: ${sseUrl}`);

    // Build URL-safe authentication parameter for SSE
    let authUrl = sseUrl;
    if (this.config.authType === "token" && this.config.token) {
      // Use official ?token parameter for token auth
      authUrl += `?token=${this.config.token}`;
    } else if (
      this.config.authType === "user" &&
      this.config.user &&
      this.config.pass
    ) {
      // For basic auth, ntfy expects ?auth=Base64("Basic Base64(user:pass)")
      // Use URL-safe base64: replace + with -, / with _, strip = padding
      const credentials = `${this.config.user}:${this.config.pass}`;
      const basicAuthValue = `Basic ${Buffer.from(credentials).toString("base64")}`;
      const encodedAuth = Buffer.from(basicAuthValue)
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
      authUrl += `?auth=${encodedAuth}`;
    }

    this.log.info(`Subscribing to topic "${topicName}" at ${sseUrl}`);
    this.log.debug(
      `SSE connection created for topic "${topicName}" (parameters masked)`,
    );

    const es = new EventSource(authUrl);

    es.onopen = () => {
      this.log.debug(`SSE connection opened for topic "${topicName}"`);
      this.setStateAsync(`topics.${safeName}.subscribed`, true, true);
    };

    es.addEventListener("message", (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.event === "message") {
          this.handleIncomingMessage(topicName, data);
        }
      } catch (error) {
        this.log.warn(
          `Failed to parse SSE message for topic "${topicName}": ${error.message}`,
        );
      }
    });

    es.onerror = (error) => {
      this.log.warn(
        `SSE error for topic "${topicName}": ${error.message || "Connection error"}. Will retry automatically.`,
      );
      this.setStateAsync(`topics.${safeName}.subscribed`, false, true);
    };

    this.log.debug(
      `SSE EventSource created for topic "${topicName}", waiting for connection...`,
    );

    this.subscriptions.set(topicName, es);
  }

  /**
   * Handle an incoming message from a subscribed topic.
   *
   * @param {string} topicName - Topic name
   * @param {object} data - Message data
   */
  async handleIncomingMessage(topicName, data) {
    const safeName = this.sanitizeTopicName(topicName);

    this.log.debug(
      `Received message on topic "${topicName}": ${JSON.stringify(data)}`,
    );

    await this.setStateAsync(
      `topics.${safeName}.lastMessage`,
      data.message || "",
      true,
    );
    await this.setStateAsync(
      `topics.${safeName}.lastTitle`,
      data.title || "",
      true,
    );
    await this.setStateAsync(
      `topics.${safeName}.lastPriority`,
      data.priority || 3,
      true,
    );
    await this.setStateAsync(
      `topics.${safeName}.lastTags`,
      data.tags ? data.tags.join(",") : "",
      true,
    );
    await this.setStateAsync(
      `topics.${safeName}.lastClick`,
      data.click || "",
      true,
    );

    const attachUrl =
      data.attachment && data.attachment.url ? data.attachment.url : "";
    await this.setStateAsync(
      `topics.${safeName}.lastAttachmentUrl`,
      attachUrl,
      true,
    );
    await this.setStateAsync(
      `topics.${safeName}.lastTimestamp`,
      data.time ? data.time * 1000 : Date.now(),
      true,
    );
    await this.setStateAsync(
      `topics.${safeName}.lastMessageId`,
      data.id || "",
      true,
    );
    await this.setStateAsync(
      `topics.${safeName}.lastJson`,
      JSON.stringify(data),
      true,
    );
  }

  /**
   * Fetch account statistics from the ntfy server.
   */
  async fetchAccountStats() {
    this.log.debug("Starting account statistics fetch...");
    const url = (this.config.url || "https://ntfy.sh").replace(/\/+$/, "");
    const authHeaders = this.getAuthHeaders();

    // Only fetch if authenticated
    if (!authHeaders["Authorization"]) {
      this.log.debug(
        "Skipping account stats fetch - no authentication configured.",
      );
      return;
    }

    try {
      const response = await axios.get(`${url}/v1/account`, {
        headers: authHeaders,
        timeout: 10000,
      });

      const account = response.data;

      if (account.role) {
        await this.setStateAsync(
          "stats.account.tier",
          account.tier || account.role || "free",
          true,
        );
      }

      if (account.limits) {
        const limits = account.limits;
        await this.setStateAsync(
          "stats.messages.limit",
          limits.messages || 0,
          true,
        );
        await this.setStateAsync(
          "stats.messages.expiryDuration",
          limits.messages_expiry_duration || 0,
          true,
        );
        await this.setStateAsync(
          "stats.emails.limit",
          limits.emails || 0,
          true,
        );
        await this.setStateAsync("stats.calls.limit", limits.calls || 0, true);
        await this.setStateAsync(
          "stats.reservations.limit",
          limits.reservations || 0,
          true,
        );
        await this.setStateAsync(
          "stats.attachments.storageLimit",
          limits.attachment_total_size || 0,
          true,
        );
        await this.setStateAsync(
          "stats.attachments.fileSizeLimit",
          limits.attachment_file_size || 0,
          true,
        );
        await this.setStateAsync(
          "stats.attachments.expiryDuration",
          limits.attachment_expiry_duration || 0,
          true,
        );
        await this.setStateAsync(
          "stats.attachments.bandwidthLimit",
          limits.attachment_bandwidth || 0,
          true,
        );
      }

      if (account.stats) {
        const stats = account.stats;
        await this.setStateAsync(
          "stats.messages.published",
          stats.messages || 0,
          true,
        );
        await this.setStateAsync(
          "stats.messages.remaining",
          stats.messages_remaining || 0,
          true,
        );
        await this.setStateAsync("stats.emails.sent", stats.emails || 0, true);
        await this.setStateAsync(
          "stats.emails.remaining",
          stats.emails_remaining || 0,
          true,
        );
        await this.setStateAsync("stats.calls.made", stats.calls || 0, true);
        await this.setStateAsync(
          "stats.calls.remaining",
          stats.calls_remaining || 0,
          true,
        );
        await this.setStateAsync(
          "stats.reservations.count",
          stats.reservations || 0,
          true,
        );
        await this.setStateAsync(
          "stats.reservations.remaining",
          stats.reservations_remaining || 0,
          true,
        );
        await this.setStateAsync(
          "stats.attachments.storage",
          stats.attachment_total_size || 0,
          true,
        );
        await this.setStateAsync(
          "stats.attachments.storageRemaining",
          stats.attachment_total_size_remaining || 0,
          true,
        );
      }

      this.log.debug("Account statistics updated successfully.");
      this.log.debug(`Account data received: ${JSON.stringify(account)}`);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        this.log.debug(
          "Account stats not available - authentication failed or not supported.",
        );
      } else if (error.response && error.response.status === 404) {
        this.log.debug("Account stats endpoint not available on this server.");
      } else {
        this.log.warn(`Failed to fetch account statistics: ${error.message}`);
      }
    }
  }

  /**
   * Check the ntfy server version and compare with latest available.
   */
  async checkServerVersion() {
    this.log.debug("Starting server version check...");
    const url = (this.config.url || "https://ntfy.sh").replace(/\/+$/, "");
    const authHeaders = this.getAuthHeaders();

    try {
      this.log.debug(`Checking server health at ${url}/v1/health...`);
      // Get current server health/version
      const healthResponse = await axios.get(`${url}/v1/health`, {
        headers: authHeaders,
        timeout: 10000,
      });

      if (healthResponse.data && healthResponse.data.healthy) {
        this.log.debug(`Server connection successful! Server is healthy.`);
        await this.setStateAsync("info.connection", true, true);
      } else {
        this.log.warn(
          `Server health check returned unhealthy status: ${JSON.stringify(healthResponse.data)}`,
        );
        await this.setStateAsync("info.connection", false, true);
      }

      // Try to get server version (admin-only endpoint)
      try {
        const versionResponse = await axios.get(`${url}/v1/version`, {
          headers: authHeaders,
          timeout: 10000,
        });

        if (versionResponse.data && versionResponse.data.version) {
          await this.setStateAsync(
            "info.serverVersion",
            versionResponse.data.version,
            true,
          );
          this.log.debug(`Server version: ${versionResponse.data.version}`);
        }
      } catch {
        this.log.debug(
          "Server version endpoint not available (requires admin privileges).",
        );
      }

      // Check for latest version from GitHub releases (only for self-hosted)
      if (url !== "https://ntfy.sh") {
        try {
          const githubResponse = await axios.get(
            "https://api.github.com/repos/binwiederhier/ntfy/releases/latest",
            { timeout: 10000 },
          );

          if (githubResponse.data && githubResponse.data.tag_name) {
            const latestVersion = githubResponse.data.tag_name.replace(
              /^v/,
              "",
            );
            await this.setStateAsync("info.latestVersion", latestVersion, true);

            const currentVersion =
              await this.getStateAsync("info.serverVersion");
            if (currentVersion && currentVersion.val) {
              const isUpdateAvailable =
                currentVersion.val.toString() !== latestVersion;
              await this.setStateAsync(
                "info.updateAvailable",
                isUpdateAvailable,
                true,
              );
            }
          }
        } catch {
          this.log.debug("Failed to check for latest ntfy version on GitHub.");
        }
      }
    } catch (error) {
      this.log.warn(`Server health check failed: ${error.message}`);
      await this.setStateAsync("info.connection", false, true);
    }
  }

  /**
   * Is called when adapter shuts down - callback has to be called under any circumstances!
   *
   * @param {() => void} callback Callback to be called when unloaded
   */
  onUnload(callback) {
    try {
      // Close all SSE subscriptions
      for (const [topicName, es] of this.subscriptions) {
        this.log.debug(`Closing subscription for topic "${topicName}"`);
        es.close();
      }
      this.subscriptions.clear();

      // Clear intervals
      if (this.statsInterval) {
        clearInterval(this.statsInterval);
        this.statsInterval = null;
      }
      if (this.versionCheckInterval) {
        clearInterval(this.versionCheckInterval);
        this.versionCheckInterval = null;
      }

      this.log.info("ntfy-sh adapter stopped.");
      callback();
    } catch {
      callback();
    }
  }

  /**
   * Some message was sent to this instance over message box. Used by email, pushover, text2speech, ...
   * Using this method requires "common.messagebox" property to be set to true in io-package.json
   *
   * @param {ioBroker.Message} obj The message object
   */
  async onMessage(obj) {
    if (typeof obj === "object" && obj.message) {
      try {
        let result;
        switch (obj.command) {
          case "send":
            result = await this.sendNotification(obj.message);
            break;
          case "publish":
            result = await this.sendNotification(obj.message);
            break;
          case "clear":
          case "dismiss":
            result = await this.dismissNotification(obj.message);
            break;
          case "delete":
            result = await this.deleteNotification(obj.message);
            break;
          default:
            this.log.warn(`Unknown command: ${obj.command}`);
            if (obj.callback) {
              this.sendTo(
                obj.from,
                obj.command,
                { error: `Unknown command: ${obj.command}` },
                obj.callback,
              );
            }
            return;
        }

        if (obj.callback) {
          this.sendTo(
            obj.from,
            obj.command,
            { success: true, ...result },
            obj.callback,
          );
        }
      } catch (error) {
        this.log.error(
          `Failed to execute command "${obj.command}": ${error.message}`,
        );
        if (obj.callback) {
          this.sendTo(
            obj.from,
            obj.command,
            { error: error.message },
            obj.callback,
          );
        }
      }
    }
  }

  /**
   * Send a notification to ntfy.
   *
   * @param {string|object} msgObj The message object or string
   * @returns {Promise<object>} The response data
   */
  async sendNotification(msgObj) {
    this.log.debug(`sendNotification called with: ${JSON.stringify(msgObj)}`);
    let text = "";
    let topic = "";
    let title = "";
    let priority = "";
    let tags = "";
    let click = "";
    let attach = "";
    let attachFile = "";
    let filename = "";
    let actions = "";
    let markdown = false;
    let delay = "";
    let email = "";
    let call = "";
    let icon = "";
    let sequenceId = "";
    let cache = "";
    let firebase = "";
    let unifiedPush = "";
    let template = "";

    if (typeof msgObj === "string") {
      text = msgObj;
    } else if (typeof msgObj === "object") {
      text = msgObj.message || "";
      topic = msgObj.topic || "";
      title = msgObj.title || "";
      priority = msgObj.priority || "";
      tags = msgObj.tags || "";
      click = msgObj.click || "";
      attach = msgObj.attach || "";
      attachFile = msgObj.attach_file || msgObj.attachFile || "";
      filename = msgObj.filename || "";
      actions = msgObj.actions || msgObj.action || "";
      markdown = !!msgObj.markdown;
      delay = msgObj.delay || "";
      email = msgObj.email || "";
      call = msgObj.call || "";
      icon = msgObj.icon || "";
      sequenceId = msgObj.sequence_id || msgObj.sequenceId || "";
      cache = msgObj.cache;
      firebase = msgObj.firebase;
      unifiedPush = msgObj.unified_push || msgObj.unifiedPush;
      template = msgObj.template;
    }

    // Use default topic from config if not specified
    if (!topic) {
      this.log.debug("No topic specified, using default topic from config...");
      topic = this.config.defaultTopic || "";
    }

    if (!topic) {
      throw new Error("Topic is required to send a notification.");
    }

    // Default message text if empty (like HA)
    if (!text) {
      text = "triggered";
      this.log.debug("No message text specified, using default: 'triggered'");
    }

    const url = (this.config.url || "https://ntfy.sh").replace(/\/+$/, "");

    if (attach && attachFile) {
      this.log.warn(
        'Both "attach" (URL) and "attach_file" (local file) are provided. "attach_file" will take precedence.',
      );
    }

    // If attach_file is specified, use PUT method with file upload
    if (attachFile) {
      return await this.sendWithFileAttachment(
        url,
        topic,
        text,
        title,
        priority,
        tags,
        click,
        filename,
        actions,
        markdown,
        delay,
        email,
        call,
        icon,
        sequenceId,
        cache,
        firebase,
        unifiedPush,
        template,
        attachFile,
      );
    }

    const endpoint = `${url}/${encodeURIComponent(topic)}`;
    this.log.debug(`Sending notification to endpoint: ${endpoint}`);

    const headers = {};

    if (title) {
      headers["Title"] = title;
    }
    if (priority) {
      headers["Priority"] = priority.toString();
    }
    if (tags) {
      headers["Tags"] = Array.isArray(tags) ? tags.join(",") : tags;
    }
    if (click) {
      headers["Click"] = click;
    }
    if (attach) {
      headers["Attach"] = attach;
    }
    if (filename) {
      headers["Filename"] = filename;
    }
    if (actions) {
      headers["Actions"] =
        typeof actions === "object" ? JSON.stringify(actions) : actions;
    }
    if (markdown) {
      headers["Markdown"] = "yes";
    }
    if (delay) {
      headers["Delay"] = delay;
    }
    if (email) {
      headers["Email"] = email;
    }
    if (call) {
      headers["Call"] = call;
    }
    if (icon) {
      headers["Icon"] = icon;
    }
    if (sequenceId) {
      headers["Sequence-ID"] = sequenceId;
    }

    if (cache === true || cache === "no") {
      headers["Cache"] = "no";
    }
    if (firebase === true || firebase === "no") {
      headers["Firebase"] = "no";
    }
    if (unifiedPush === true || unifiedPush === "1") {
      headers["UnifiedPush"] = "1";
    }

    // Template query param (yes/true/1 for manual, or a name like 'github')
    let requestUrl = endpoint;
    if (
      template !== undefined &&
      template !== null &&
      template !== "" &&
      template !== false
    ) {
      const tplVal =
        template === true || template === "yes" || template === "1"
          ? "yes"
          : template;
      requestUrl += `${requestUrl.includes("?") ? "&" : "?"}tpl=${tplVal}`;
    }

    // Apply Authentication
    const authHeaders = this.getAuthHeaders();
    Object.assign(headers, authHeaders);

    try {
      const debugParams = [];
      if (title) {
        debugParams.push(`Title: "${title}"`);
      }
      debugParams.push(`Message: "${text}"`);
      if (priority) {
        debugParams.push(`Priority: "${priority}"`);
      }
      if (tags) {
        debugParams.push(`Tags: "${tags}"`);
      }
      if (click) {
        debugParams.push(`Click: "${click}"`);
      }
      if (attach) {
        debugParams.push(`Attach: "${attach}"`);
      }
      if (filename) {
        debugParams.push(`Filename: "${filename}"`);
      }
      if (actions) {
        debugParams.push(
          `Actions: "${typeof actions === "object" ? JSON.stringify(actions) : actions}"`,
        );
      }
      if (markdown) {
        debugParams.push(`Markdown: "yes"`);
      }
      if (delay) {
        debugParams.push(`Delay: "${delay}"`);
      }
      if (email) {
        debugParams.push(`Email: "${email}"`);
      }
      if (call) {
        debugParams.push(`Call: "${call}"`);
      }
      if (icon) {
        debugParams.push(`Icon: "${icon}"`);
      }
      if (sequenceId) {
        debugParams.push(`Sequence-ID: "${sequenceId}"`);
      }
      if (cache === true || cache === "no") {
        debugParams.push(`Cache: "no"`);
      }
      if (firebase === true || firebase === "no") {
        debugParams.push(`Firebase: "no"`);
      }
      if (unifiedPush === true || unifiedPush === "1") {
        debugParams.push(`UnifiedPush: "1"`);
      }
      if (template) {
        debugParams.push(`Template: "${template}"`);
      }

      this.log.debug(
        `Sending notification to topic "${topic}" (${debugParams.join(", ")})`,
      );
      this.log.debug(
        `POST request to ${requestUrl} with headers: ${JSON.stringify(headers)}`,
      );
      const response = await axios.post(requestUrl, text, {
        headers,
        timeout: 10000,
      });
      this.log.debug(
        `Notification successfully sent to topic "${topic}" (HTTP ${response.status})`,
      );
      return response.data || {};
    } catch (error) {
      this.log.error(
        `Failed to send notification to topic "${topic}": ${error.message}`,
      );
      if (error.response) {
        const status = error.response.status;
        const data =
          typeof error.response.data === "string"
            ? error.response.data
            : JSON.stringify(error.response.data);
        throw new Error(`ntfy server returned HTTP ${status}: ${data}`, {
          cause: error,
        });
      } else if (error.request) {
        throw new Error(
          `No response from ntfy server at ${url}. Please check the server URL and network connectivity.`,
          { cause: error },
        );
      } else {
        throw error;
      }
    }
  }

  /**
   * Send a notification with a local file attachment via PUT.
   *
   * @param {string} url Server URL
   * @param {string} topic Topic name
   * @param {string} text Message text
   * @param {string} title Title
   * @param {string} priority Priority
   * @param {string} tags Tags
   * @param {string} click Click URL
   * @param {string} filename Filename
   * @param {string|object} actions Actions
   * @param {boolean} markdown Markdown enabled
   * @param {string} delay Delay
   * @param {string} email Email
   * @param {string} call Call
   * @param {string} icon Icon URL
   * @param {string} sequenceId Sequence ID
   * @param {string} cache Cache control
   * @param {string} firebase Firebase control
   * @param {string} unifiedPush UnifiedPush control
   * @param {string} template Template control
   * @param {string} filePath Path to the file to attach
   * @returns {Promise<object>} The response data
   */
  async sendWithFileAttachment(
    url,
    topic,
    text,
    title,
    priority,
    tags,
    click,
    filename,
    actions,
    markdown,
    delay,
    email,
    call,
    icon,
    sequenceId,
    cache,
    firebase,
    unifiedPush,
    template,
    filePath,
  ) {
    this.log.debug(`sendWithFileAttachment called for file: ${filePath}`);
    const endpoint = `${url}/${encodeURIComponent(topic)}`;
    this.log.debug(`Sending file attachment to endpoint: ${endpoint}`);

    // Determine filename from path if not specified
    if (!filename) {
      filename = path.basename(filePath);
    }

    const headers = {
      "Content-Type": "application/octet-stream",
    };

    if (filename) {
      headers["Filename"] = filename;
    }
    if (text) {
      headers["Message"] = text;
    }
    if (title) {
      headers["Title"] = title;
    }
    if (priority) {
      headers["Priority"] = priority.toString();
    }
    if (tags) {
      headers["Tags"] = Array.isArray(tags) ? tags.join(",") : tags;
    }
    if (click) {
      headers["Click"] = click;
    }
    if (actions) {
      headers["Actions"] =
        typeof actions === "object" ? JSON.stringify(actions) : actions;
    }
    if (markdown) {
      headers["Markdown"] = "yes";
    }
    if (delay) {
      headers["Delay"] = delay;
    }
    if (email) {
      headers["Email"] = email;
    }
    if (call) {
      headers["Call"] = call;
    }
    if (icon) {
      headers["Icon"] = icon;
    }
    if (sequenceId) {
      headers["Sequence-ID"] = sequenceId;
    }

    if (cache === true || cache === "no") {
      headers["Cache"] = "no";
    }
    if (firebase === true || firebase === "no") {
      headers["Firebase"] = "no";
    }
    if (unifiedPush === true || unifiedPush === "1") {
      headers["UnifiedPush"] = "1";
    }

    // Template query param (yes/true/1 for manual, or a name like 'github')
    let requestUrl = endpoint;
    if (
      template !== undefined &&
      template !== null &&
      template !== "" &&
      template !== false
    ) {
      const tplVal =
        template === true || template === "yes" || template === "1"
          ? "yes"
          : template;
      requestUrl += `${requestUrl.includes("?") ? "&" : "?"}tpl=${tplVal}`;
    }

    // Apply Authentication
    const authHeaders = this.getAuthHeaders();
    Object.assign(headers, authHeaders);

    try {
      const debugFileParams = [];
      if (text) {
        debugFileParams.push(`Message: "${text}"`);
      }
      if (title) {
        debugFileParams.push(`Title: "${title}"`);
      }
      if (priority) {
        debugFileParams.push(`Priority: "${priority}"`);
      }
      if (tags) {
        debugFileParams.push(`Tags: "${tags}"`);
      }
      if (click) {
        debugFileParams.push(`Click: "${click}"`);
      }
      if (actions) {
        debugFileParams.push(
          `Actions: "${typeof actions === "object" ? JSON.stringify(actions) : actions}"`,
        );
      }
      if (markdown) {
        debugFileParams.push(`Markdown: "yes"`);
      }
      if (delay) {
        debugFileParams.push(`Delay: "${delay}"`);
      }
      if (email) {
        debugFileParams.push(`Email: "${email}"`);
      }
      if (call) {
        debugFileParams.push(`Call: "${call}"`);
      }
      if (icon) {
        debugFileParams.push(`Icon: "${icon}"`);
      }
      if (sequenceId) {
        debugFileParams.push(`Sequence-ID: "${sequenceId}"`);
      }
      if (cache === true || cache === "no") {
        debugFileParams.push(`Cache: "no"`);
      }
      if (firebase === true || firebase === "no") {
        debugFileParams.push(`Firebase: "no"`);
      }
      if (unifiedPush === true || unifiedPush === "1") {
        debugFileParams.push(`UnifiedPush: "1"`);
      }
      if (template) {
        debugFileParams.push(`Template: "${template}"`);
      }

      this.log.debug(
        `Sending file attachment "${filename}" to topic "${topic}" (${debugFileParams.join(", ")})`,
      );
      this.log.debug(`Reading file: ${filePath}`);
      const fileData = fs.readFileSync(filePath);
      this.log.debug(`File size: ${fileData.length} bytes`);
      const response = await axios.put(requestUrl, fileData, {
        headers,
        timeout: 30000,
      });
      this.log.debug(
        `File attachment successfully sent to topic "${topic}" (HTTP ${response.status})`,
      );
      return response.data || {};
    } catch (error) {
      this.log.error(
        `Failed to send file attachment to topic "${topic}": ${error.message}`,
      );
      if (error.code === "ENOENT") {
        throw new Error(`File not found: ${filePath}`, { cause: error });
      }
      if (error.response) {
        const status = error.response.status;
        const data =
          typeof error.response.data === "string"
            ? error.response.data
            : JSON.stringify(error.response.data);
        throw new Error(`ntfy server returned HTTP ${status}: ${data}`, {
          cause: error,
        });
      } else if (error.request) {
        throw new Error(
          `No response from ntfy server at ${url}. Please check the server URL and network connectivity.`,
          { cause: error },
        );
      } else {
        throw error;
      }
    }
  }

  /**
   * Dismiss (clear/mark as read) a notification.
   *
   * @param {string|object} msgObj The message object containing topic and sequence_id
   * @returns {Promise<object>} The response data
   */
  async dismissNotification(msgObj) {
    this.log.debug(
      `dismissNotification called with: ${JSON.stringify(msgObj)}`,
    );
    let topic = "";
    let sequenceId = "";

    if (typeof msgObj === "object") {
      topic = msgObj.topic || "";
      sequenceId = msgObj.sequence_id || msgObj.sequenceId || "";
    }

    if (!topic) {
      topic = this.config.defaultTopic || "";
    }

    if (!topic) {
      throw new Error("Topic is required to dismiss a notification.");
    }

    if (!sequenceId) {
      throw new Error("sequence_id is required to dismiss a notification.");
    }

    const url = (this.config.url || "https://ntfy.sh").replace(/\/+$/, "");
    const endpoint = `${url}/${encodeURIComponent(topic)}/${encodeURIComponent(sequenceId)}/clear`;

    const headers = this.getAuthHeaders();

    try {
      this.log.debug(
        `Dismissing notification ${sequenceId} on topic "${topic}" (via PUT)`,
      );
      const response = await axios.put(endpoint, null, {
        headers,
        timeout: 10000,
      });
      this.log.debug(
        `Notification "${sequenceId}" successfully dismissed on topic "${topic}" (HTTP ${response.status})`,
      );
      return response.data || {};
    } catch (error) {
      this.log.error(
        `Failed to dismiss notification "${sequenceId}" on topic "${topic}": ${error.message}`,
      );
      if (error.response) {
        const status = error.response.status;
        const data =
          typeof error.response.data === "string"
            ? error.response.data
            : JSON.stringify(error.response.data);
        throw new Error(
          `Failed to dismiss notification: HTTP ${status}: ${data}`,
          { cause: error },
        );
      } else {
        throw new Error(`Failed to dismiss notification: ${error.message}`, {
          cause: error,
        });
      }
    }
  }

  /**
   * Delete a notification.
   *
   * @param {string|object} msgObj The message object containing topic and sequence_id
   * @returns {Promise<object>} The response data
   */
  async deleteNotification(msgObj) {
    this.log.debug(`deleteNotification called with: ${JSON.stringify(msgObj)}`);
    let topic = "";
    let sequenceId = "";

    if (typeof msgObj === "object") {
      topic = msgObj.topic || "";
      sequenceId = msgObj.sequence_id || msgObj.sequenceId || "";
    }

    if (!topic) {
      topic = this.config.defaultTopic || "";
    }

    if (!topic) {
      throw new Error("Topic is required to delete a notification.");
    }

    if (!sequenceId) {
      throw new Error("sequence_id is required to delete a notification.");
    }

    const url = (this.config.url || "https://ntfy.sh").replace(/\/+$/, "");
    const endpoint = `${url}/${encodeURIComponent(topic)}/${encodeURIComponent(sequenceId)}`;

    const headers = this.getAuthHeaders();

    try {
      this.log.debug(
        `Deleting notification ${sequenceId} from topic "${topic}"`,
      );
      const response = await axios.delete(endpoint, {
        headers,
        timeout: 10000,
      });
      this.log.debug(
        `Notification "${sequenceId}" successfully deleted from topic "${topic}" (HTTP ${response.status})`,
      );
      return response.data || {};
    } catch (error) {
      this.log.error(
        `Failed to delete notification "${sequenceId}" from topic "${topic}": ${error.message}`,
      );
      if (error.response) {
        const status = error.response.status;
        const data =
          typeof error.response.data === "string"
            ? error.response.data
            : JSON.stringify(error.response.data);
        throw new Error(
          `Failed to delete notification: HTTP ${status}: ${data}`,
          { cause: error },
        );
      } else {
        throw new Error(`Failed to delete notification: ${error.message}`, {
          cause: error,
        });
      }
    }
  }
}

if (require.main !== module) {
  // Export the constructor in compact mode
  /**
   * @param {Partial<utils.AdapterOptions>} [options] Options for the adapter
   */
  module.exports = (options) => new Ntfy(options);
} else {
  // otherwise start the instance directly
  new Ntfy();
}

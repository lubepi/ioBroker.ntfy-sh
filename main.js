"use strict";

const utils = require("@iobroker/adapter-core");
const axios = require("axios");

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
  }

  /**
   * Is called when databases are connected and adapter received configuration.
   */
  async onReady() {
    this.log.info(`config url: ${this.config.url}`);

    if (!this.config.url) {
      this.log.warn(
        "ntfy Server URL is not configured. Please configure it in the adapter settings.",
      );
    }
  }

  /**
   * Is called when adapter shuts down - callback has to be called under any circumstances!
   *
   * @param {() => void} callback Callback to be called when unloaded
   */
  onUnload(callback) {
    try {
      // Here you must clear all timeouts or intervals that may still be active
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
      // The command is usually "send"
      if (obj.command === "send") {
        // e.g. sendTo("ntfy.0", "send", { message: "Hello", topic: "my-topic" });
        try {
          await this.sendNotification(obj.message);

          // Send response in callback if required
          if (obj.callback) {
            this.sendTo(obj.from, obj.command, { success: true }, obj.callback);
          }
        } catch (error) {
          this.log.error(`Failed to send notification: ${error}`);
          if (obj.callback) {
            this.sendTo(
              obj.from,
              obj.command,
              { error: error.toString() },
              obj.callback,
            );
          }
        }
      }
    }
  }

  async sendNotification(msgObj) {
    let text = "";
    let topic = "";
    let title = "";
    let priority = "";
    let tags = "";
    let click = "";
    let attach = "";
    let actions = "";
    let markdown = false;
    let delay = "";

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
      actions = msgObj.actions || "";
      markdown = !!msgObj.markdown;
      delay = msgObj.delay || "";
    }

    if (!topic) {
      throw new Error("Topic is required to send a notification.");
    }

    if (!text) {
      throw new Error("Message text is required.");
    }

    const url = this.config.url || "https://ntfy.sh";
    const endpoint = `${url.replace(/\/$/, "")}/${encodeURIComponent(topic)}`;

    const headers = {};

    if (title) {
      headers["Title"] = title;
    }
    if (priority) {
      headers["Priority"] = priority.toString();
    }
    if (tags) {
      headers["Tags"] = tags;
    }
    if (click) {
      headers["Click"] = click;
    }
    if (attach) {
      headers["Attach"] = attach;
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

    // Apply Authentication
    if (
      this.config.authType === "basic" &&
      this.config.user &&
      this.config.pass
    ) {
      const up = `${this.config.user}:${this.config.pass}`;
      headers["Authorization"] = `Basic ${Buffer.from(up).toString("base64")}`;
    } else if (this.config.authType === "token" && this.config.token) {
      headers["Authorization"] = `Bearer ${this.config.token}`;
    }

    await axios.post(endpoint, text, { headers });
    this.log.debug(`Notification sent to topic ${topic} at ${url}`);
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

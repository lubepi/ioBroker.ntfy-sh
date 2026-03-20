![Logo](admin/ntfy-sh.png)
# ioBroker.ntfy-sh

## Unofficial ntfy.sh adapter for ioBroker

Send and receive notifications via [ntfy.sh](https://ntfy.sh) directly from ioBroker. This adapter is a community project and not affiliated with ntfy LLC.

### Features
* **Publish notifications** with full ntfy parameter support
* **Subscribe to topics** and receive messages in real-time via SSE (Server-Sent Events)
* **Account statistics** – view usage stats (messages, emails, calls, attachments, reservations)
* **Server version check** – detect available updates for self-hosted ntfy instances
* **Connection status** – monitor the adapter's connection to the ntfy server
* Basic authentication and bearer token support
* Custom server URLs (or the standard ntfy.sh instance)
* **Integrated `sendTo` Blockly blocks** for graphic scripts (send and manage)
* **Dismiss (clear) and delete notifications** by sequence ID (message replacement)
* File upload attachments via PUT

### Supported Notification Parameters

| Parameter | Description |
|-----------|-------------|
| `message` | Notification message text (defaults to "triggered" if empty) |
| `topic` | Target topic (falls back to configured default topic) |
| `title` | Notification title |
| `priority` | Priority level: 1 (min), 2 (low), 3 (default), 4 (high), 5 (max) |
| `tags` | Tags or emoji shortcodes (comma-separated string or array) |
| `click` | URL opened when notification is clicked |
| `attach` | URL of file to attach |
| `attach_file` | Local file path to upload as attachment (uses PUT) |
| `filename` | Custom filename for the attachment |
| `actions` | Action buttons (JSON string or object) |
| `markdown` | Enable Markdown formatting (`true`/`false`) |
| `delay` | Delay delivery (e.g. "30s", "5m", "2h") |
| `email` | Forward notification to this email address |
| `call` | Phone number to call with TTS (requires ntfy Pro) |
| `icon` | Icon URL displayed next to the notification |
| `sequence_id` | `Sequence-ID` | **Replace/Update** existing notification with the same ID |
| `message_id` | `Message-ID` | **Deduplication**: ignore duplicate messages with the same ID (server-side) |
| `cache` | `Cache` | Set to `no` to disable server-side caching |
| `firebase` | `Firebase` | Set to `no` to disable forwarding to Firebase Cloud Messaging (Android) |
| `unified_push`| `UnifiedPush` | Set to `1` to enable UnifiedPush support |
| `template` | `tpl` | Set to `yes` to use server-side templates |

### Topic Subscription (Receive Messages)

Configure topics in the adapter settings under the **Topics** tab. The adapter subscribes to these topics via SSE and creates states for each topic under `ntfy-sh.0.topics.<topicName>`:

| State | Description |
|-------|-------------|
| `lastMessage` | Last received message text |
| `lastTitle` | Last received title |
| `lastPriority` | Last received priority |
| `lastTags` | Last received tags (comma-separated) |
| `lastClick` | Last received click URL |
| `lastAttachmentUrl` | Last received attachment URL |
| `lastTimestamp` | Last message timestamp |
| `lastMessageId` | Last message ID |
| `lastJson` | Full JSON of last received message |
| `subscribed` | Whether the subscription is active |

### Account Statistics

When authentication is configured, the adapter fetches account statistics every 15 minutes and stores them under `ntfy-sh.0.stats`:

* **Messages**: published, remaining, limit, expiry duration
* **Emails**: sent, remaining, limit
* **Phone calls**: made, remaining, limit
* **Reserved topics**: count, remaining, limit
* **Attachments**: storage used/remaining/limit, expiry duration, file size limit, bandwidth limit
* **Account**: subscription tier

### Server Version Check

For self-hosted instances, the adapter checks the server version and compares it with the latest GitHub release:

| State | Description |
|-------|-------------|
| `info.serverVersion` | Current ntfy server version |
| `info.latestVersion` | Latest available version |
| `info.updateAvailable` | Whether an update is available |
| `info.connection` | Connection status to the ntfy server |

### Blockly Examples
Under the **Sendto** category, use the following blocks:

#### 1. ntfy (send)
Dispatch a message with all supported parameters:
1. Set the **Instance**.
2. Set the **Message**.
3. Set the **Topic** (or leave empty to use the default topic).
... (other parameters)
8. Use **Sequence ID** if you want to update/overwrite an existing notification later.

#### 2. ntfy Verwaltung (manage)
Clear or delete an existing notification:
1. Set the **Instance**.
2. Set the **Aktion** (quittieren/ausblenden or löschen).
3. Set the **Topic**.
4. Set the **Sequenz-ID** of the message you want to manage.

### JavaScript Examples

#### Send a notification
```javascript
sendTo('ntfy-sh.0', 'send', {
    message: 'Motion detected in the backyard!',
    title: 'Security Alert',
    topic: 'home_alerts_xyz',
    priority: 'high',
    tags: 'warning,motion',
    click: 'https://example.com',
    markdown: true
});
```

#### Send with email forwarding and icon
```javascript
sendTo('ntfy-sh.0', 'send', {
    message: 'Temperature above threshold!',
    topic: 'home_alerts_xyz',
    email: 'admin@example.com',
    icon: 'https://example.com/icon.png',
    priority: '4'
});
```

#### Send with file attachment
```javascript
sendTo('ntfy-sh.0', 'send', {
    message: 'Security camera snapshot',
    topic: 'home_alerts_xyz',
    attach_file: '/tmp/snapshot.jpg',
    filename: 'camera_snapshot.jpg'
});
```

#### Send with action buttons
```javascript
sendTo('ntfy-sh.0', 'send', {
    message: 'Doorbell rang!',
    topic: 'home_alerts_xyz',
    actions: [
        { action: 'view', label: 'Open Camera', url: 'https://camera.example.com' },
        { action: 'http', label: 'Turn on Light', url: 'https://ha.example.com/api/light/on', method: 'POST' }
    ]
});
```

#### Dismiss a notification
```javascript
sendTo('ntfy-sh.0', 'dismiss', {
    topic: 'home_alerts_xyz',
    sequence_id: 'abc123'
});
```

#### Delete a notification
```javascript
sendTo('ntfy-sh.0', 'delete', {
    topic: 'home_alerts_xyz',
    sequence_id: 'abc123'
});
```

### Authentication
Ntfy supports a few variations:
* **None**: Suitable for standard ntfy.sh servers (topics are public!).
* **Basic Auth**: Setup a local server with Username and Password.
* **Access Token**: Create tokens and use Bearer token validation for your topic.

### Commands

| Command | Description |
|---------|-------------|
| `send` / `publish` | Send a notification |
| `dismiss` / `clear` | Dismiss (mark as read) a notification by sequence_id |
| `delete` | Delete a notification by sequence_id |

## Changelog
### 0.3.0 (2026-03-19)
* (lubepi) Added missing publishing features: Deduplication (`message_id`), Cache control, Firebase/UnifiedPush support, and Templates

### 0.2.1 (2026-03-18)
* (lubepi) Corrected `sequence_id` mapping to use `Sequence-ID` (enables message replacement/overwriting)
* (lubepi) Added new Blockly management block to clear or delete notifications by sequence ID
* (lubepi) Updated blockly tooltips and documentation

### 0.2.0 (2026-03-18)
* (lubepi) Subscribe to topics via SSE (receive messages in real-time)
* (lubepi) Account statistics (messages, emails, calls, attachments, reservations)
* (lubepi) Server version check for self-hosted instances
* (lubepi) Connection status monitoring
* (lubepi) New parameters: email, call, icon, filename, attach_file, sequence_id
* (lubepi) Dismiss and delete notifications by sequence_id
* (lubepi) Default topic configuration
* (lubepi) Topics configuration tab with subscription management
* (lubepi) Extended Blockly block with all new parameters

### 0.1.0 (2026-03-16)
* (lubepi) initial release with full ntfy.sh support

## License
MIT License - Copyright (c) 2026 lubepi <https://github.com/lubepi>

## Legal Notice
This adapter is **NOT** an official product of ntfy LLC. The name **ntfy**, the logo and branding are trademarks of ntfy LLC. This adapter is a community project to provide integration into ioBroker.

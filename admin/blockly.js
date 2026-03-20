"use strict";

if (typeof Blockly !== "undefined") {
  Blockly.Sendto = Blockly.Sendto || {};
  Blockly.Sendto.HUE = Blockly.Sendto.HUE || 160;

  // Define custom translations for the blockly block
  Blockly.Words["ntfy"] = {
    en: "ntfy-sh notification",
    de: "ntfy-sh Benachrichtigung",
    ru: "ntfy-sh уведомление",
    pt: "ntfy-sh notificação",
    nl: "ntfy-sh melding",
    fr: "ntfy-sh notification",
    it: "ntfy-sh notifica",
    es: "ntfy-sh notificación",
    pl: "ntfy-sh powiadomienie",
    uk: "ntfy-sh сповіщення",
    "zh-cn": "ntfy-sh 通知",
  };
  Blockly.Words["ntfy_anyInstance"] = {
    en: "all instances",
    de: "alle Instanzen",
    ru: "все экземпляры",
    pt: "todas as instâncias",
    nl: "alle instanties",
    fr: "toutes les instances",
    it: "tutte le istanze",
    es: "todas las instancias",
    pl: "wszystkie instancje",
    uk: "всі екземпляри",
    "zh-cn": "所有实例",
  };
  Blockly.Words["ntfy_message"] = {
    en: "message",
    de: "Nachricht",
    ru: "сообщение",
    pt: "mensagem",
    nl: "bericht",
    fr: "message",
    it: "messaggio",
    es: "mensaje",
    pl: "wiadomość",
    uk: "повідомлення",
    "zh-cn": "消息",
  };
  Blockly.Words["ntfy_topic"] = {
    en: "topic",
    de: "Topic",
    ru: "тема",
    pt: "tópico",
    nl: "onderwerp",
    fr: "sujet",
    it: "argomento",
    es: "tema",
    pl: "temat",
    uk: "тема",
    "zh-cn": "主题",
  };
  Blockly.Words["ntfy_title"] = {
    en: "title",
    de: "Titel",
    ru: "заголовок",
    pt: "título",
    nl: "titel",
    fr: "titre",
    it: "titolo",
    es: "título",
    pl: "tytuł",
    uk: "заголовок",
    "zh-cn": "标题",
  };
  Blockly.Words["ntfy_priority"] = {
    en: "priority",
    de: "Priorität",
    ru: "приоритет",
    pt: "prioridade",
    nl: "prioriteit",
    fr: "priorité",
    it: "priorità",
    es: "prioridad",
    pl: "priorytet",
    uk: "пріоритет",
    "zh-cn": "优先级",
  };
  Blockly.Words["ntfy_priority_default"] = {
    en: "default",
    de: "Standard",
    ru: "по умолчанию",
    pt: "padrão",
    nl: "standaard",
    fr: "par défaut",
    it: "predefinito",
    es: "predeterminado",
    pl: "domyślny",
    uk: "за замовчуванням",
    "zh-cn": "默认",
  };
  Blockly.Words["ntfy_priority_min"] = {
    en: "min",
    de: "sehr niedrig",
    ru: "минимальный",
    pt: "mínimo",
    nl: "minimaal",
    fr: "minimum",
    it: "minimo",
    es: "mínimo",
    pl: "minimalny",
    uk: "мінімальний",
    "zh-cn": "最低",
  };
  Blockly.Words["ntfy_priority_low"] = {
    en: "low",
    de: "niedrig",
    ru: "низкий",
    pt: "baixo",
    nl: "laag",
    fr: "bas",
    it: "basso",
    es: "bajo",
    pl: "niski",
    uk: "низький",
    "zh-cn": "低",
  };
  Blockly.Words["ntfy_priority_high"] = {
    en: "high",
    de: "hoch",
    ru: "высокий",
    pt: "alto",
    nl: "hoog",
    fr: "haut",
    it: "alto",
    es: "alto",
    pl: "wysoki",
    uk: "високий",
    "zh-cn": "高",
  };
  Blockly.Words["ntfy_priority_max"] = {
    en: "max",
    de: "sehr hoch",
    ru: "максимальный",
    pt: "máximo",
    nl: "maximaal",
    fr: "maximum",
    it: "massimo",
    es: "máximo",
    pl: "maksymalny",
    uk: "максимальний",
    "zh-cn": "最高",
  };
  Blockly.Words["ntfy_tags"] = {
    en: "tags",
    de: "Tags",
    ru: "теги",
    pt: "tags",
    nl: "tags",
    fr: "tags",
    it: "tag",
    es: "etiquetas",
    pl: "tagi",
    uk: "теги",
    "zh-cn": "标签",
  };
  Blockly.Words["ntfy_click"] = {
    en: "click URL",
    de: "Klick-URL",
    ru: "URL клика",
    pt: "URL de clique",
    nl: "klik-URL",
    fr: "URL de clic",
    it: "URL clic",
    es: "URL de clic",
    pl: "URL kliknięcia",
    uk: "URL кліку",
    "zh-cn": "点击链接",
  };
  Blockly.Words["ntfy_attach"] = {
    en: "attach URL",
    de: "Anhang-URL",
    ru: "URL вложения",
    pt: "URL de anexo",
    nl: "bijlage-URL",
    fr: "URL de pièce jointe",
    it: "URL allegato",
    es: "URL de adjunto",
    pl: "URL załącznika",
    uk: "URL вкладення",
    "zh-cn": "附件链接",
  };
  Blockly.Words["ntfy_attach_file"] = {
    en: "attach file (local path)",
    de: "Datei anhängen (lokaler Pfad)",
    ru: "прикрепить файл (локальный путь)",
    pt: "anexar ficheiro (caminho local)",
    nl: "bestand bijvoegen (lokaal pad)",
    fr: "joindre un fichier (chemin local)",
    it: "allega file (percorso locale)",
    es: "adjuntar archivo (ruta local)",
    pl: "dołącz plik (ścieżka lokalna)",
    uk: "прикріпити файл (локальний шлях)",
    "zh-cn": "附加文件（本地路径）",
  };
  Blockly.Words["ntfy_filename"] = {
    en: "filename",
    de: "Dateiname",
    ru: "имя файла",
    pt: "nome do ficheiro",
    nl: "bestandsnaam",
    fr: "nom du fichier",
    it: "nome file",
    es: "nombre de archivo",
    pl: "nazwa pliku",
    uk: "ім'я файлу",
    "zh-cn": "文件名",
  };
  Blockly.Words["ntfy_actions"] = {
    en: "actions (JSON)",
    de: "Aktionen (JSON)",
    ru: "действия (JSON)",
    pt: "ações (JSON)",
    nl: "acties (JSON)",
    fr: "actions (JSON)",
    it: "azioni (JSON)",
    es: "acciones (JSON)",
    pl: "akcje (JSON)",
    uk: "дії (JSON)",
    "zh-cn": "操作 (JSON)",
  };
  Blockly.Words["ntfy_markdown"] = {
    en: "markdown",
    de: "Markdown",
    ru: "markdown",
    pt: "markdown",
    nl: "markdown",
    fr: "markdown",
    it: "markdown",
    es: "markdown",
    pl: "markdown",
    uk: "markdown",
    "zh-cn": "markdown",
  };
  Blockly.Words["ntfy_delay"] = {
    en: "delay",
    de: "Verzögerung",
    ru: "задержка",
    pt: "atraso",
    nl: "vertraging",
    fr: "délai",
    it: "ritardo",
    es: "retraso",
    pl: "opóźnienie",
    uk: "затримка",
    "zh-cn": "延迟",
  };
  Blockly.Words["ntfy_email"] = {
    en: "email (forward to)",
    de: "E-Mail (weiterleiten an)",
    ru: "email (переслать на)",
    pt: "email (encaminhar para)",
    nl: "e-mail (doorsturen naar)",
    fr: "email (transférer à)",
    it: "email (inoltra a)",
    es: "email (reenviar a)",
    pl: "email (przekaż do)",
    uk: "email (переслати на)",
    "zh-cn": "电子邮件（转发至）",
  };
  Blockly.Words["ntfy_call"] = {
    en: "call (phone number)",
    de: "Anruf (Telefonnummer)",
    ru: "звонок (номер телефона)",
    pt: "chamada (número de telefone)",
    nl: "bellen (telefoonnummer)",
    fr: "appel (numéro de téléphone)",
    it: "chiamata (numero di telefono)",
    es: "llamada (número de teléfono)",
    pl: "połączenie (numer telefonu)",
    uk: "дзвінок (номер телефону)",
    "zh-cn": "电话（电话号码）",
  };
  Blockly.Words["ntfy_icon"] = {
    en: "icon URL",
    de: "Icon-URL",
    ru: "URL иконки",
    pt: "URL do ícone",
    nl: "pictogram-URL",
    fr: "URL de l'icône",
    it: "URL icona",
    es: "URL del icono",
    pl: "URL ikony",
    uk: "URL іконки",
    "zh-cn": "图标链接",
  };
  Blockly.Words["ntfy_sequence_id"] = {
    en: "sequence ID",
    de: "Sequenz-ID",
    ru: "ID последовательности",
    pt: "ID de sequência",
    nl: "sequentie-ID",
    fr: "ID de séquence",
    it: "ID sequenza",
    es: "ID de secuencia",
    pl: "ID sekwencji",
    uk: "ID послідовності",
    "zh-cn": "序列ID",
  };
  Blockly.Words["ntfy_manage"] = {
    en: "ntfy-sh management",
    de: "ntfy-sh Verwaltung",
    ru: "ntfy-sh управление",
    pt: "gestão ntfy-sh",
    nl: "ntfy-sh beheer",
    fr: "gestion ntfy-sh",
    it: "gestione ntfy-sh",
    es: "gestión de ntfy-sh",
    pl: "zarządzanie ntfy-sh",
    uk: "управління ntfy-sh",
    "zh-cn": "ntfy-sh 管理",
  };
  Blockly.Words["ntfy_action"] = {
    en: "action",
    de: "Aktion",
    ru: "действие",
    pt: "ação",
    nl: "actie",
    fr: "action",
    it: "azione",
    es: "acción",
    pl: "akcja",
    uk: "дія",
    "zh-cn": "行动",
  };
  Blockly.Words["ntfy_action_clear"] = {
    en: "clear/dismiss",
    de: "quittieren (ausblenden)",
    ru: "очистить/отклонить",
    pt: "limpar/descartar",
    nl: "wissen/negeren",
    fr: "effacer/ignorer",
    it: "cancella/ignora",
    es: "borrar/descartar",
    pl: "wyczyść/odrzuć",
    uk: "очистити/відхилити",
    "zh-cn": "清除/驳回",
  };
  Blockly.Words["ntfy_action_delete"] = {
    en: "delete (from server)",
    de: "löschen (vom Server)",
    ru: "удалить (с сервера)",
    pt: "eliminar (do servidor)",
    nl: "verwijderen (van server)",
    fr: "supprimer (du serveur)",
    it: "elimina (dal server)",
    es: "eliminar (del servidor)",
    pl: "usuń (z serwera)",
    uk: "видалити (з сервера)",
    "zh-cn": "删除（从服务器）",
  };

  Blockly.Words["ntfy_cache"] = {
    en: "Disable Cache Control",
    de: "Cache-Kontrolle deaktivieren",
    ru: "Отключить управление кешем",
    pt: "Desativar controle de cache",
    nl: "Cachebeheer uitschakelen",
    fr: "Désactiver le contrôle du cache",
    it: "Disabilita controllo cache",
    es: "Desactivar control de caché",
    pl: "Wyłącz kontrolę bufora",
    uk: "Вимкнути керування кешем",
    "zh-cn": "禁用缓存控制",
  };
  Blockly.Words["ntfy_firebase"] = {
    en: "Disable Firebase",
    de: "Firebase deaktivieren",
    ru: "Отключить Firebase",
    pt: "Desativar Firebase",
    nl: "Firebase uitschakelen",
    fr: "Désactiver Firebase",
    it: "Disabilita Firebase",
    es: "Desactivar Firebase",
    pl: "Wyłącz Firebase",
    uk: "Вимкнути Firebase",
    "zh-cn": "禁用 Firebase",
  };
  Blockly.Words["ntfy_unifiedpush"] = {
    en: "UnifiedPush",
    de: "UnifiedPush",
    ru: "UnifiedPush",
    pt: "UnifiedPush",
    nl: "UnifiedPush",
    fr: "UnifiedPush",
    it: "UnifiedPush",
    es: "UnifiedPush",
    pl: "UnifiedPush",
    uk: "UnifiedPush",
    "zh-cn": "UnifiedPush",
  };
  Blockly.Words["ntfy_template"] = {
    en: "Template",
    de: "Template",
    ru: "Шаблон",
    pt: "Template",
    nl: "Template",
    fr: "Template",
    it: "Template",
    es: "Plantilla",
    pl: "Szablon",
    uk: "Шаблон",
    "zh-cn": "模板",
  };

  Blockly.Words["ntfy_mutator_arguments"] = {
    en: "Options",
    de: "Optionen",
    ru: "Опции",
    pt: "Opções",
    nl: "Opties",
    fr: "Options",
    it: "Opzioni",
    es: "Opciones",
    pl: "Opcje",
    uk: "Опції",
    "zh-cn": "选项",
  };
  Blockly.Words["ntfy_mutator_tooltip"] = {
    en: "Add an option",
    de: "Option hinzufügen",
    ru: "Добавить опцию",
    pt: "Adicionar uma opção",
    nl: "Optie toevoegen",
    fr: "Ajouter une option",
    it: "Aggiungi un'opzione",
    es: "Añadir una opción",
    pl: "Dodaj opcję",
    uk: "Додати опцію",
    "zh-cn": "添加选项",
  };

  Blockly.Words["ntfy_tooltip"] = {
    en: "Sends ntfy-sh notification.\ntopic: Channel.\nmessage: Text.\ntitle: Header.\npriority: 1-5.\ntags: Emojis.\nclick URL: On-click link.\nicon URL: Custom icon.\nactions (JSON): Buttons.\nattach URL: File link.\nattach file (local path): Upload file.\nfilename: Name for attachment.\nsequence ID: Message update ID.\ndelay: Delivery delay.\nemail (forward to): Forwarding address.\ncall (phone number): Phone call.\nDisable Cache Control: No server cache.\nDisable Firebase: No Firebase.\nUnifiedPush: UnifiedPush support.\nUse Template: Manual (yes) or preset (github, grafana, alertmanager).\nmarkdown: Markdown syntax.",
    de: "Sendet ntfy-sh Nachricht.\nTopic: Kanalname.\nNachricht: Textinhalt.\nTitel: Überschrift.\nPriorität: 1-5.\nTags: Emojis.\nKlick-URL: Link bei Klick.\nIcon-URL: Eigenes Icon.\nAktionen (JSON): Buttons.\nAnhang-URL: Datei-Link.\nDatei anhängen (lokaler Pfad): Datei-Upload.\nDateiname: Name des Anhangs.\nSequenz-ID: Nachrichten-Update ID.\nVerzögerung: Liefer-Verzug.\nE-Mail (weiterleiten an): E-Mail-Adresse.\nAnruf (Telefonnummer): Telefonanruf.\nCache-Kontrolle deaktivieren: Kein Server-Cache.\nFirebase deaktivieren: Kein Firebase.\nUnifiedPush: UnifiedPush.\nTemplate verwenden: Template-Syntax.\nMarkdown: Markdown-Syntax.",
    ru: "Отправляет ntfy-sh уведомление.\ntopic: Канал.\nmessage: Текст.\ntitle: Заголовок.\npriority: Важность (1-5).\ntags: Эмодзи.\nclick URL: Ссылка.\nicon URL: Иконка.\nactions (JSON): Кнопки.\nattach URL: Файл.\nattach file (local path): Загрузка файла.\nfilename: Имя файла.\nsequence ID: ID обновления.\ndelay: Задержка.\nemail (forward to): Электронная почта.\ncall (phone number): Телефон.\nDisable Cache Control: Откл. кеш.\nDisable Firebase: Откл. Firebase.\nUnifiedPush: UnifiedPush.\nUse Template: Шаблон.\nmarkdown: Markdown.",
    pt: "Envia notificação ntfy-sh.\ntopic: Canal.\nmessage: Mensagem.\ntitle: Título.\npriority: 1-5.\ntags: Emojis.\nclick URL: Link.\nicon URL: Ícone.\nactions (JSON): Botões.\nattach URL: Link do arquivo.\nattach file (local path): Enviar arquivo.\nfilename: Nome do arquivo.\nsequence ID: ID atualização.\ndelay: Atraso.\nemail (forward to): Encaminhar p/ email.\ncall (phone number): Chamada telefônica.\nDisable Cache Control: Sem cache.\nDisable Firebase: Sem Firebase.\nUnifiedPush: UnifiedPush.\nUse Template: Modelo.\nmarkdown: Markdown.",
    nl: "Verstuurt ntfy-sh melding.\ntopic: Kanaal.\nmessage: Bericht.\ntitle: Kop.\nprioriteit: 1-5.\ntags: Emojis.\nclick URL: Link.\nicon URL: Icoon.\nactions (JSON): Acties.\nattach URL: Bestandlink.\nattach file (local path): Upload bestand.\nfilename: Bestandsnaam.\nsequence ID: Update ID.\ndelay: Vertraging.\nemail (forward to): E-mail doorsturen.\ncall (phone number): Bellen.\nDisable Cache Control: Geen cache.\nDisable Firebase: Geen Firebase.\nUnifiedPush: UnifiedPush.\nUse Template: Sjabloon.\nmarkdown: Markdown.",
    fr: "Envoie une notification ntfy-sh.\ntopic: Canal.\nmessage: Texte.\ntitre: En-tête.\npriorité: 1-5.\ntags: Emojis.\nclick URL: Lien.\nicon URL: Icône.\nactions (JSON): Boutons.\nattach URL: Lien fichier.\nattach file (local path): Upload fichier.\nfilename: Nom du fichier.\nsequence ID: ID mise à jour.\ndelay: Délai.\nemail (forward to): Faire suivre email.\ncall (phone number): Appel.\nDisable Cache Control: Pas de cache.\nDisable Firebase: Pas de Firebase.\nUnifiedPush: UnifiedPush.\nUse Template: Modèle.\nmarkdown: Markdown.",
    it: "Invia notifica ntfy-sh.\ntopic: Canale.\nmessage: Messaggio.\ntitle: Intestazione.\npriorità: 1-5.\ntags: Emoji.\nclick URL: Link.\nicon URL: Icona.\nactions (JSON): Pulsanti.\nattach URL: Link file.\nattach file (local path): Carica file.\nfilename: Nome file.\nsequence ID: ID aggiornamento.\ndelay: Ritardo.\nemail (forward to): Inoltra email.\ncall (phone number): Chiamata.\nDisable Cache Control: No cache.\nDisable Firebase: No Firebase.\nUnifiedPush: UnifiedPush.\nUse Template: Modello.\nmarkdown: Markdown.",
    es: "Envía notificación ntfy-sh.\ntema: Canal.\nmensaje: Mensaje.\ntítulo: Encabezado.\nprioridad: 1-5.\ntags: Emojis.\nclick URL: Enlace.\nicon URL: Icono.\nacciones (JSON): Botones.\nattach URL: Link archivo.\nattach file (local path): Subir archivo.\nfilename: Nombre archivo.\nsequence ID: ID actualización.\ndelay: Retraso.\nemail (forward to): Reenviar email.\ncall (phone number): Llamada.\nDisable Cache Control: Sin caché.\nDisable Firebase: Sin Firebase.\nUnifiedPush: UnifiedPush.\nUse Template: Plantilla.\nmarkdown: Markdown.",
    pl: "Wysyła powiadomienie ntfy-sh.\ntopic: Kanał.\nmessage: Treść.\ntitle: Nagłówek.\npriority: 1-5.\ntags: Emoji.\nclick URL: Link.\nicon URL: Ikona.\nactions (JSON): Przyciski.\nattach URL: Link pliku.\nattach file (local path): Prześlij plik.\nfilename: Nazwa pliku.\nsequence ID: ID aktualizacji.\ndelay: Opóźnienie.\nemail (forward to): Przekaż e-mail.\ncall (phone number): Połączenie.\nDisable Cache Control: Brak bufora.\nDisable Firebase: Brak Firebase.\nUnifiedPush: UnifiedPush.\nUse Template: Szablon.\nmarkdown: Markdown.",
    uk: "Надсилає ntfy-sh повідомлення.\ntopic: Канал.\nmessage: Текст.\ntitle: Заголовок.\npriority: 1-5.\ntags: Емодзі.\nclick URL: Посилання.\nicon URL: Іконка.\nactions (JSON): Кнопки.\nattach URL: Файл.\nattach file (local path): Шлях файлу.\nfilename: Ім'я файлу.\nsequence ID: ID оновлення.\ndelay: Затримка.\nemail (forward to): Переслати пошту.\ncall (phone number): Телефон.\nDisable Cache Control: Без кеша.\nDisable Firebase: Без Firebase.\nUnifiedPush: UnifiedPush.\nUse Template: Шаблон.\nmarkdown: Markdown.",
    "zh-cn":
      "发送 ntfy-sh 通知。\ntopic：频道。\nmessage：文本。\ntitle：标题。\npriority：1-5。\ntags：表情符号。\nclick URL：点击链接。\nicon URL：定制图标。\nactions (JSON)：按钮。\nattach URL：附件链接。\nattach file (local path)：本地文件。\nfilename：文件名。\nsequence ID：更新ID。\ndelay：延迟。\nemail (forward to)：转发邮件。\ncall (phone number)：拨打电话。\nDisable Cache Control：禁用缓存。\nDisable Firebase：禁用 Firebase。\nUnifiedPush：UnifiedPush。\nUse Template：模板。\nmarkdown：Markdown。",
  };

  Blockly.Words["ntfy_manage_tooltip"] = {
    en: "Manage ntfy-sh messages.\naction: clear/dismiss (app) or delete (server).\ntopic: Channel name.\nsequence ID: Unique ID of the message.",
    de: "ntfy-sh Nachrichten verwalten.\nAktion: Quittieren (App) oder Löschen (Server).\nTopic: Kanalname.\nSequenz-ID: Eindeutige ID der Nachricht.",
    ru: "Управление ntfy-sh.\nдействие: очистить (приложение) или удалить (сервер).\ntopic: Канал.\nsequence ID: ID сообщения.",
    pt: "Gerir mensagens ntfy-sh.\nação: limpar (app) ou eliminar (servidor).\ntopic: Canal.\nsequence ID: ID mensagem.",
    nl: "Beheer ntfy-sh berichten.\nactie: wissen (app) of verwijderen (server).\ntopic: Kanaal.\nsequence ID: Bericht-ID.",
    fr: "Gérer les messages ntfy-sh.\naction: effacer (app) ou supprimer (serveur).\ntopic: Canal.\nsequence ID: ID du message.",
    it: "Gestisci messaggi ntfy-sh.\nazione: cancella (app) o elimina (server).\ntopic: Canale.\nsequence ID: ID messaggio.",
    es: "Gestionar mensajes ntfy-sh.\nacción: borrar (app) o eliminar (servidor).\ntopic: Canal.\nsequence ID: ID mensaje.",
    pl: "Zarządzaj wiadomościami ntfy-sh.\nakcja: wyczyść (aplikacja) lub usuń (serwer).\ntopic: Kanał.\nsequence ID: ID wiadomości.",
    uk: "Керування ntfy-sh.\nдія: очистити (додаток) або видалити (сервер).\ntopic: Канал.\nsequence ID: ID повідомлення.",
    "zh-cn":
      "管理 ntfy-sh 消息。\n操作：清除（应用） oder 删除（服务器）。\ntopic：频道名称。\nsequence ID：消息ID。",
  };

  Blockly.Blocks["ntfy_mutator_container"] = {
    init: function () {
      this.appendDummyInput().appendField(
        Blockly.Words["ntfy_mutator_arguments"][systemLang],
      );
      this.appendStatementInput("STACK");
      this.setColour(Blockly.Sendto.HUE);
      this.setTooltip(Blockly.Words["ntfy_mutator_tooltip"][systemLang]);
      this.contextMenu = false;
    },
  };
  const ntfyMutatorOptions = [
    { key: "title", word: "ntfy_title" },
    { key: "priority", word: "ntfy_priority" },
    { key: "tags", word: "ntfy_tags" },
    { key: "icon", word: "ntfy_icon" },
    { key: "click", word: "ntfy_click" },
    { key: "actions", word: "ntfy_actions" },
    { key: "attach", word: "ntfy_attach" },
    { key: "attach_file", word: "ntfy_attach_file" },
    { key: "filename", word: "ntfy_filename" },
    { key: "sequence_id", word: "ntfy_sequence_id" },
    { key: "delay", word: "ntfy_delay" },
    { key: "email", word: "ntfy_email" },
    { key: "call", word: "ntfy_call" },
    { key: "template", word: "ntfy_template" },
    { key: "cache", word: "ntfy_cache" },
    { key: "firebase", word: "ntfy_firebase" },
    { key: "unified_push", word: "ntfy_unifiedpush" },
    { key: "markdown", word: "ntfy_markdown" },
  ];

  const ntfyBooleanOptions = ["cache", "firebase", "unified_push", "markdown"];

  ntfyMutatorOptions.forEach(function (opt) {
    Blockly.Blocks[`ntfy_mutator_${opt.key}`] = {
      init: function () {
        this.appendDummyInput("ATTR").appendField(
          Blockly.Words[opt.word][systemLang],
        );
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(Blockly.Sendto.HUE);
        this.setTooltip(Blockly.Words["ntfy_mutator_tooltip"][systemLang]);
        this.contextMenu = false;
      },
    };
  });

  Blockly.Sendto.blocks["ntfy"] =
    '<block type="ntfy">' +
    '  <mutation xmlns="http://www.w3.org/1999/xhtml" items="title,priority,tags,icon,click,actions,attach,attach_file,filename"></mutation>' +
    '  <value name="MESSAGE">' +
    '    <shadow type="text">' +
    '      <field name="TEXT">Hello from ioBroker</field>' +
    "    </shadow>" +
    "  </value>" +
    '  <value name="TOPIC">' +
    '    <shadow type="text">' +
    '      <field name="TEXT">my-topic</field>' +
    "    </shadow>" +
    "  </value>" +
    "</block>" +
    '<block type="ntfy_manage">' +
    '     <value name="TOPIC">' +
    '         <shadow type="text">' +
    '             <field name="TEXT">my-topic</field>' +
    "         </shadow>" +
    "     </value>" +
    '     <value name="SEQUENCE_ID">' +
    '         <shadow type="text">' +
    '             <field name="TEXT">my-sequence-id</field>' +
    "         </shadow>" +
    "     </value>" +
    "</block>";

  Blockly.Blocks["ntfy"] = {
    init: function () {
      this.appendDummyInput("INSTANCE")
        .appendField(Blockly.Words["ntfy"][systemLang])
        .appendField(
          new Blockly.FieldDropdown(function () {
            if (typeof main !== "undefined" && main.instances) {
              var instances = main.instances;
              var result = [
                [Blockly.Words["ntfy_anyInstance"][systemLang], ""],
              ];
              for (var i = 0; i < instances.length; i++) {
                if (instances[i].startsWith("system.adapter.ntfy-sh.")) {
                  var shortId = instances[i].replace("system.adapter.", "");
                  result.push([shortId, shortId]);
                }
              }
              return result.length > 1
                ? result
                : [[Blockly.Words["ntfy_anyInstance"][systemLang], ""]];
            }
            var options = [[Blockly.Words["ntfy_anyInstance"][systemLang], ""]];
            for (var j = 0; j < 10; j++) {
              options.push([`ntfy-sh.${j}`, `ntfy-sh.${j}`]);
            }
            return options;
          }),
          "INSTANCE",
        );

      this.appendValueInput("MESSAGE")
        .setCheck("String")
        .appendField(Blockly.Words["ntfy_message"][systemLang]);

      this.appendValueInput("TOPIC")
        .setCheck("String")
        .appendField(Blockly.Words["ntfy_topic"][systemLang]);

      // Initiale Attribute setzen
      this.attributes_ = [
        "title",
        "priority",
        "tags",
        "icon",
        "click",
        "actions",
        "attach",
        "attach_file",
        "filename",
      ];

      this.updateMutator_();
      this.updateShape_();

      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Blockly.Sendto.HUE);
      this.setTooltip(Blockly.Words["ntfy_tooltip"][systemLang]);
      this.setHelpUrl("https://ntfy.sh/docs/publish/");
    },

    mutationToDom: function () {
      const container = Blockly.utils.xml.createElement("mutation");
      container.setAttribute("items", this.attributes_.join(","));
      return container;
    },

    domToMutation: function (xmlElement) {
      const items = xmlElement.getAttribute("items");
      this.attributes_ = items ? items.split(",") : [];
      this.updateShape_();
      this.updateMutator_();
    },

    decompose: function (workspace) {
      const containerBlock = workspace.newBlock("ntfy_mutator_container");
      containerBlock.initSvg();

      let connection = containerBlock.getInput("STACK").connection;

      this.attributes_.forEach((attr) => {
        if (Blockly.Blocks[`ntfy_mutator_${attr}`]) {
          const itemBlock = workspace.newBlock(`ntfy_mutator_${attr}`);
          itemBlock.initSvg();
          connection.connect(itemBlock.previousConnection);
          connection = itemBlock.nextConnection;
        }
      });

      // Flyout Live-Update
      workspace.addChangeListener((e) => {
        if (
          e.type === Blockly.Events.BLOCK_CREATE ||
          e.type === Blockly.Events.BLOCK_DELETE
        ) {
          const allBlocks = workspace.getAllBlocks(false);
          const usedTypes = allBlocks.map((b) => b.type);
          const availableBlocks = ntfyMutatorOptions
            .map((opt) => `ntfy_mutator_${opt.key}`)
            .filter((type) => !usedTypes.includes(type));

          const flyout = workspace.getFlyout
            ? workspace.getFlyout()
            : workspace.flyout_;
          if (flyout && typeof flyout.show === "function") {
            const xmlList = availableBlocks.map((type) => {
              const block = Blockly.utils.xml.createElement("block");
              block.setAttribute("type", type);
              return block;
            });
            flyout.show(xmlList);
          }
        }
      });

      return containerBlock;
    },

    compose: function (containerBlock) {
      const oldAttributes = [...this.attributes_];
      this.attributes_ = [];
      let itemBlock = containerBlock.getInputTargetBlock("STACK");
      const connections = {};

      while (itemBlock) {
        if (itemBlock.type.startsWith("ntfy_mutator_")) {
          const attrName = itemBlock.type.replace("ntfy_mutator_", "");
          if (!this.attributes_.includes(attrName)) {
            this.attributes_.push(attrName);
            connections[attrName] = itemBlock.valueConnection_;
          }
        }
        itemBlock =
          itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
      }

      // Trenne Verbindungen von gelöschten Attributen
      for (const attrName of oldAttributes) {
        if (!this.attributes_.includes(attrName)) {
          const input = this.getInput(attrName);
          if (input && input.connection && input.connection.targetConnection) {
            input.connection.targetConnection.disconnect();
          }
        }
      }

      this.updateShape_();
      this.updateMutator_();

      // Verbinde Blöcke wieder
      for (const attrName of this.attributes_) {
        if (connections[attrName]) {
          Blockly.icons.MutatorIcon.reconnect(
            connections[attrName],
            this,
            attrName,
          );
        }
      }
    },

    saveConnections: function (containerBlock) {
      let itemBlock = containerBlock.getInputTargetBlock("STACK");
      while (itemBlock) {
        if (itemBlock.type.startsWith("ntfy_mutator_")) {
          const attrName = itemBlock.type.replace("ntfy_mutator_", "");
          let input;
          try {
            input = this.getInput(attrName);
          } catch (e) {
            // ignore
          }

          itemBlock.valueConnection_ =
            input && input.connection && input.connection.targetConnection
              ? input.connection.targetConnection
              : null;
        }
        itemBlock = itemBlock.nextConnection?.targetBlock();
      }
    },

    updateMutator_: function () {
      const availableBlocks = ntfyMutatorOptions
        .filter((opt) => !this.attributes_.includes(opt.key))
        .map((opt) => `ntfy_mutator_${opt.key}`);

      if (!this.mutator) {
        this.setMutator(new Blockly.icons.MutatorIcon(availableBlocks, this));
      } else {
        this.mutator.blockTypes_ = availableBlocks;
        if (this.mutator.flyoutBlockTypes_) {
          this.mutator.flyoutBlockTypes_ = availableBlocks;
        }
      }
    },

    updateShape_: function () {
      // 1. Alle dynamischen Inputs löschen, die NICHT mehr im attributes_ Array stehen
      const allPossibleKeys = ntfyMutatorOptions.map((o) => o.key);
      for (const key of allPossibleKeys) {
        if (!this.attributes_.includes(key) && this.getInput(key)) {
          this.removeInput(key);
        }
      }

      // 2. Benötigte Inputs generieren (oder updaten)
      for (const attrName of this.attributes_) {
        const opt = ntfyMutatorOptions.find((o) => o.key === attrName);
        if (!opt) {
          continue;
        }

        const isBoolean = ntfyBooleanOptions.includes(attrName);
        const isPriority = attrName === "priority";
        const fieldName = `FIELD_${attrName}`;
        const fieldText = Blockly.Words[opt.word][systemLang];

        let input = this.getInput(attrName);

        if (!input) {
          if (isBoolean) {
            input = this.appendDummyInput(attrName).setAlign(
              Blockly.ALIGN_RIGHT,
            );
            input
              .appendField(fieldText)
              .appendField(new Blockly.FieldCheckbox("FALSE"), fieldName);
          } else if (isPriority) {
            input = this.appendDummyInput(attrName).setAlign(
              Blockly.ALIGN_RIGHT,
            );
            input.appendField(fieldText).appendField(
              new Blockly.FieldDropdown([
                [Blockly.Words["ntfy_priority_default"][systemLang], "default"],
                [Blockly.Words["ntfy_priority_min"][systemLang], "1"],
                [Blockly.Words["ntfy_priority_low"][systemLang], "2"],
                [Blockly.Words["ntfy_priority_high"][systemLang], "4"],
                [Blockly.Words["ntfy_priority_max"][systemLang], "5"],
              ]),
              fieldName,
            );
          } else {
            input = this.appendValueInput(attrName).setAlign(
              Blockly.ALIGN_RIGHT,
            );
            input.appendField(fieldText);

            // Shadow-Blöcke (Textfelder) generieren
            setTimeout(
              (__input) => {
                if (
                  __input.connection &&
                  !__input.connection.isConnected() &&
                  this.workspace
                ) {
                  const _shadow = this.workspace.newBlock("text");
                  _shadow.setShadow(true);
                  _shadow.initSvg();
                  _shadow.render();
                  _shadow.outputConnection.connect(__input.connection);
                }
              },
              50,
              input,
            );
          }
        }
      }
    },
  };

  Blockly.Blocks["ntfy_manage"] = {
    init: function () {
      this.appendDummyInput("INSTANCE")
        .appendField(Blockly.Words["ntfy_manage"][systemLang])
        .appendField(
          new Blockly.FieldDropdown(function () {
            if (typeof main !== "undefined" && main.instances) {
              var instances = main.instances;
              var result = [
                [Blockly.Words["ntfy_anyInstance"][systemLang], ""],
              ];
              for (var i = 0; i < instances.length; i++) {
                if (instances[i].startsWith("system.adapter.ntfy-sh.")) {
                  var shortId = instances[i].replace("system.adapter.", "");
                  result.push([shortId, shortId]);
                }
              }
              return result.length > 1
                ? result
                : [[Blockly.Words["ntfy_anyInstance"][systemLang], ""]];
            }
            var options = [[Blockly.Words["ntfy_anyInstance"][systemLang], ""]];
            for (var j = 0; j < 10; j++) {
              options.push([`ntfy-sh.${j}`, `ntfy-sh.${j}`]);
            }
            return options;
          }),
          "INSTANCE",
        );

      this.appendDummyInput("ACTION_INPUT")
        .appendField(Blockly.Words["ntfy_action"][systemLang])
        .appendField(
          new Blockly.FieldDropdown([
            [Blockly.Words["ntfy_action_clear"][systemLang], "clear"],
            [Blockly.Words["ntfy_action_delete"][systemLang], "delete"],
          ]),
          "ACTION",
        );

      this.appendValueInput("TOPIC")
        .setCheck("String")
        .appendField(Blockly.Words["ntfy_topic"][systemLang]);

      this.appendValueInput("SEQUENCE_ID")
        .setCheck("String")
        .appendField(Blockly.Words["ntfy_sequence_id"][systemLang]);

      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Blockly.Sendto.HUE);
      this.setTooltip(Blockly.Words["ntfy_manage_tooltip"][systemLang]);
      this.setHelpUrl(
        "https://ntfy.sh/docs/publish/#updating-deleting-notifications",
      );
    },
  };

  Blockly.JavaScript["ntfy_manage"] = function (block) {
    var dropdown_instance = block.getFieldValue("INSTANCE");
    var dropdown_action = block.getFieldValue("ACTION");
    var value_topic = Blockly.JavaScript.valueToCode(
      block,
      "TOPIC",
      Blockly.JavaScript.ORDER_ATOMIC,
    );
    var value_sequence_id = Blockly.JavaScript.valueToCode(
      block,
      "SEQUENCE_ID",
      Blockly.JavaScript.ORDER_ATOMIC,
    );

    var instance = dropdown_instance ? `"${dropdown_instance}"` : '"ntfy-sh.0"';

    var objArr = [];
    objArr.push(`topic: ${value_topic}`);
    objArr.push(`sequence_id: ${value_sequence_id}`);

    var code = `sendTo(${instance}, "${dropdown_action}", {\n  ${objArr.join(",\n  ")}\n});\n`;
    return code;
  };

  Blockly.JavaScript["ntfy"] = function (block) {
    const dropdown_instance = block.getFieldValue("INSTANCE");
    const value_message = Blockly.JavaScript.valueToCode(
      block,
      "MESSAGE",
      Blockly.JavaScript.ORDER_ATOMIC,
    );
    const value_topic = Blockly.JavaScript.valueToCode(
      block,
      "TOPIC",
      Blockly.JavaScript.ORDER_ATOMIC,
    );

    const instance = dropdown_instance
      ? `"${dropdown_instance}"`
      : '"ntfy-sh.0"';
    const args = [];

    // Die beiden Pflichtfelder
    args.push({ attr: "message", val: value_message });
    args.push({ attr: "topic", val: value_topic });

    // Alle dynamischen Mutator-Felder abgreifen
    for (const attrName of block.attributes_) {
      let vArgument;

      if (ntfyBooleanOptions.includes(attrName)) {
        // Logik für Checkboxen
        vArgument =
          block.getFieldValue(`FIELD_${attrName}`) === "TRUE"
            ? "true"
            : "false";

        // Bei cache und firebase triggern wir "Disable", müssen den Boolean also invertieren
        if (attrName === "cache" || attrName === "firebase") {
          vArgument = vArgument === "true" ? "false" : "true";
        }
      } else if (attrName === "priority") {
        // Logik für Dropdown
        const prioVal = block.getFieldValue(`FIELD_${attrName}`);
        if (prioVal !== "default") {
          vArgument = `"${prioVal}"`;
        } else {
          continue; // Überspringen, wenn default
        }
      } else {
        // Logik für Value-Inputs (Texte, Variablen)
        vArgument = Blockly.JavaScript.valueToCode(
          block,
          attrName,
          Blockly.JavaScript.ORDER_COMMA,
        );

        // Umschließende Single-Quotes von JSON-Strings bereinigen
        if (
          vArgument &&
          vArgument.startsWith(`'{`) &&
          vArgument.endsWith(`}'`)
        ) {
          vArgument = vArgument.substring(1, vArgument.length - 1);
        }
      }

      // Nur pushen, wenn wirklich Inhalt da ist
      if (
        vArgument &&
        vArgument !== "''" &&
        vArgument !== '""' &&
        vArgument !== "null"
      ) {
        args.push({
          attr: attrName.replaceAll(`'`, `\\'`),
          val: vArgument,
        });
      }
    }

    // Code zusammenbauen
    const argStr = args.length
      ? args
          .map((a) =>
            Blockly.JavaScript.prefixLines(
              `'${a.attr}': ${a.val},`,
              Blockly.JavaScript.INDENT,
            ),
          )
          .join("\n")
      : "";

    return `sendTo(${instance}, "send", {\n${argStr}\n});\n`;
  };
}

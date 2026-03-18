"use strict";

if (typeof Blockly !== "undefined") {
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
    de: "Thema",
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

  // Define the custom blockly block
  Blockly.Sendto.blocks["ntfy"] =
    '<block type="ntfy">' +
    '     <value name="MESSAGE">' +
    '         <shadow type="text">' +
    '             <field name="TEXT">Hello from ioBroker</field>' +
    "         </shadow>" +
    "     </value>" +
    '     <value name="TOPIC">' +
    '         <shadow type="text">' +
    '             <field name="TEXT">my-topic</field>' +
    "         </shadow>" +
    "     </value>" +
    '     <value name="TITLE">' +
    '         <shadow type="text">' +
    '             <field name="TEXT"></field>' +
    "         </shadow>" +
    "     </value>" +
    '     <field name="MARKDOWN">FALSE</field>' +
    "</block>";

  Blockly.Blocks["ntfy"] = {
    init: function () {
      this.appendDummyInput("INSTANCE")
        .appendField(Blockly.Words["ntfy"][systemLang])
        .appendField(
          new Blockly.FieldDropdown(
            [[Blockly.Words["ntfy_anyInstance"][systemLang], ""]],
            function () {
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
              var options = [
                [Blockly.Words["ntfy_anyInstance"][systemLang], ""],
              ];
              for (var j = 0; j < 10; j++) {
                options.push([`ntfy-sh.${j}`, `ntfy-sh.${j}`]);
              }
              return options;
            },
          ),
          "INSTANCE",
        );

      this.appendValueInput("MESSAGE")
        .setCheck("String")
        .appendField(Blockly.Words["ntfy_message"][systemLang]);

      this.appendValueInput("TOPIC")
        .setCheck("String")
        .appendField(Blockly.Words["ntfy_topic"][systemLang]);

      this.appendValueInput("TITLE")
        .setCheck("String")
        .appendField(Blockly.Words["ntfy_title"][systemLang]);

      this.appendDummyInput("PRIORITY_INPUT")
        .appendField(Blockly.Words["ntfy_priority"][systemLang])
        .appendField(
          new Blockly.FieldDropdown([
            [Blockly.Words["ntfy_priority_default"][systemLang], "default"],
            [Blockly.Words["ntfy_priority_min"][systemLang], "1"],
            [Blockly.Words["ntfy_priority_low"][systemLang], "2"],
            [Blockly.Words["ntfy_priority_high"][systemLang], "4"],
            [Blockly.Words["ntfy_priority_max"][systemLang], "5"],
          ]),
          "PRIORITY",
        );

      this.appendValueInput("TAGS")
        .setCheck("String")
        .appendField(Blockly.Words["ntfy_tags"][systemLang]);

      this.appendValueInput("CLICK")
        .setCheck("String")
        .appendField(Blockly.Words["ntfy_click"][systemLang]);

      this.appendValueInput("ATTACH")
        .setCheck("String")
        .appendField(Blockly.Words["ntfy_attach"][systemLang]);

      this.appendValueInput("ATTACH_FILE")
        .setCheck("String")
        .appendField(Blockly.Words["ntfy_attach_file"][systemLang]);

      this.appendValueInput("FILENAME")
        .setCheck("String")
        .appendField(Blockly.Words["ntfy_filename"][systemLang]);

      this.appendValueInput("ACTIONS")
        .setCheck(["String", "Array"])
        .appendField(Blockly.Words["ntfy_actions"][systemLang]);

      this.appendValueInput("DELAY")
        .setCheck("String")
        .appendField(Blockly.Words["ntfy_delay"][systemLang]);

      this.appendValueInput("EMAIL")
        .setCheck("String")
        .appendField(Blockly.Words["ntfy_email"][systemLang]);

      this.appendValueInput("CALL")
        .setCheck("String")
        .appendField(Blockly.Words["ntfy_call"][systemLang]);

      this.appendValueInput("ICON")
        .setCheck("String")
        .appendField(Blockly.Words["ntfy_icon"][systemLang]);

      this.appendValueInput("SEQUENCE_ID")
        .setCheck("String")
        .appendField(Blockly.Words["ntfy_sequence_id"][systemLang]);

      this.appendDummyInput("MARKDOWN_INPUT")
        .appendField(Blockly.Words["ntfy_markdown"][systemLang])
        .appendField(new Blockly.FieldCheckbox("FALSE"), "MARKDOWN");

      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Blockly.Sendto.HUE);
      this.setTooltip(Blockly.Words["ntfy"][systemLang]);
      this.setHelpUrl("https://ntfy.sh/docs/publish/");
    },
  };

  Blockly.JavaScript["ntfy"] = function (block) {
    var dropdown_instance = block.getFieldValue("INSTANCE");
    var value_message = Blockly.JavaScript.valueToCode(
      block,
      "MESSAGE",
      Blockly.JavaScript.ORDER_ATOMIC,
    );
    var value_topic = Blockly.JavaScript.valueToCode(
      block,
      "TOPIC",
      Blockly.JavaScript.ORDER_ATOMIC,
    );
    var value_title = Blockly.JavaScript.valueToCode(
      block,
      "TITLE",
      Blockly.JavaScript.ORDER_ATOMIC,
    );
    var dropdown_priority = block.getFieldValue("PRIORITY");
    var value_tags = Blockly.JavaScript.valueToCode(
      block,
      "TAGS",
      Blockly.JavaScript.ORDER_ATOMIC,
    );
    var value_click = Blockly.JavaScript.valueToCode(
      block,
      "CLICK",
      Blockly.JavaScript.ORDER_ATOMIC,
    );
    var value_attach = Blockly.JavaScript.valueToCode(
      block,
      "ATTACH",
      Blockly.JavaScript.ORDER_ATOMIC,
    );
    var value_attach_file = Blockly.JavaScript.valueToCode(
      block,
      "ATTACH_FILE",
      Blockly.JavaScript.ORDER_ATOMIC,
    );
    var value_filename = Blockly.JavaScript.valueToCode(
      block,
      "FILENAME",
      Blockly.JavaScript.ORDER_ATOMIC,
    );
    var value_actions = Blockly.JavaScript.valueToCode(
      block,
      "ACTIONS",
      Blockly.JavaScript.ORDER_ATOMIC,
    );
    var value_delay = Blockly.JavaScript.valueToCode(
      block,
      "DELAY",
      Blockly.JavaScript.ORDER_ATOMIC,
    );
    var value_email = Blockly.JavaScript.valueToCode(
      block,
      "EMAIL",
      Blockly.JavaScript.ORDER_ATOMIC,
    );
    var value_call = Blockly.JavaScript.valueToCode(
      block,
      "CALL",
      Blockly.JavaScript.ORDER_ATOMIC,
    );
    var value_icon = Blockly.JavaScript.valueToCode(
      block,
      "ICON",
      Blockly.JavaScript.ORDER_ATOMIC,
    );
    var value_sequence_id = Blockly.JavaScript.valueToCode(
      block,
      "SEQUENCE_ID",
      Blockly.JavaScript.ORDER_ATOMIC,
    );
    var checkbox_markdown = block.getFieldValue("MARKDOWN") === "TRUE";

    var instance = dropdown_instance ? `"${dropdown_instance}"` : '"ntfy-sh.0"';

    var objArr = [];
    objArr.push(`message: ${value_message}`);
    objArr.push(`topic: ${value_topic}`);

    if (value_title && value_title !== "''" && value_title !== '""') {
      objArr.push(`title: ${value_title}`);
    }
    if (dropdown_priority !== "default") {
      objArr.push(`priority: "${dropdown_priority}"`);
    }
    if (value_tags && value_tags !== "''" && value_tags !== '""') {
      objArr.push(`tags: ${value_tags}`);
    }
    if (value_click && value_click !== "''" && value_click !== '""') {
      objArr.push(`click: ${value_click}`);
    }
    if (value_attach && value_attach !== "''" && value_attach !== '""') {
      objArr.push(`attach: ${value_attach}`);
    }
    if (
      value_attach_file &&
      value_attach_file !== "''" &&
      value_attach_file !== '""'
    ) {
      objArr.push(`attach_file: ${value_attach_file}`);
    }
    if (value_filename && value_filename !== "''" && value_filename !== '""') {
      objArr.push(`filename: ${value_filename}`);
    }
    if (value_actions && value_actions !== "''" && value_actions !== '""') {
      objArr.push(`actions: ${value_actions}`);
    }
    if (value_delay && value_delay !== "''" && value_delay !== '""') {
      objArr.push(`delay: ${value_delay}`);
    }
    if (value_email && value_email !== "''" && value_email !== '""') {
      objArr.push(`email: ${value_email}`);
    }
    if (value_call && value_call !== "''" && value_call !== '""') {
      objArr.push(`call: ${value_call}`);
    }
    if (value_icon && value_icon !== "''" && value_icon !== '""') {
      objArr.push(`icon: ${value_icon}`);
    }
    if (
      value_sequence_id &&
      value_sequence_id !== "''" &&
      value_sequence_id !== '""'
    ) {
      objArr.push(`sequence_id: ${value_sequence_id}`);
    }
    if (checkbox_markdown) {
      objArr.push("markdown: true");
    }

    var code = `sendTo(${instance}, "send", {\n  ${objArr.join(",\n  ")}\n});\n`;
    return code;
  };
}

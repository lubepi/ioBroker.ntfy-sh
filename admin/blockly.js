"use strict";

if (typeof Blockly !== "undefined") {
  // Define custom translations for the blockly block
  Blockly.Words["ntfy"] = {
    en: "ntfy-sh notification",
    de: "ntfy-sh Benachrichtigung",
  };
  Blockly.Words["ntfy_message"] = { en: "message", de: "Nachricht" };
  Blockly.Words["ntfy_topic"] = { en: "topic", de: "Thema" };
  Blockly.Words["ntfy_title"] = { en: "title", de: "Titel" };
  Blockly.Words["ntfy_priority"] = { en: "priority", de: "Priorität" };
  Blockly.Words["ntfy_priority_default"] = { en: "default", de: "Standard" };
  Blockly.Words["ntfy_priority_min"] = { en: "min", de: "sehr niedrig" };
  Blockly.Words["ntfy_priority_low"] = { en: "low", de: "niedrig" };
  Blockly.Words["ntfy_priority_high"] = { en: "high", de: "hoch" };
  Blockly.Words["ntfy_priority_max"] = { en: "max", de: "sehr hoch" };

  Blockly.Words["ntfy_tags"] = { en: "tags", de: "Tags" };
  Blockly.Words["ntfy_click"] = { en: "click URL", de: "Klick-URL" };
  Blockly.Words["ntfy_attach"] = { en: "attach URL", de: "Anhang-URL" };
  Blockly.Words["ntfy_actions"] = {
    en: "actions (JSON)",
    de: "Aktionen (JSON)",
  };
  Blockly.Words["ntfy_markdown"] = { en: "markdown", de: "Markdown" };
  Blockly.Words["ntfy_delay"] = { en: "delay", de: "Verzögerung" };

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
            [
              [
                Blockly.Words["ntfy_anyInstance"]
                  ? Blockly.Words["ntfy_anyInstance"][systemLang]
                  : "all instances",
                "",
              ],
            ],
            function (text) {
              if (typeof main !== "undefined" && main.instances) {
                var instances = main.instances;
                var result = [
                  [
                    Blockly.Words["ntfy_anyInstance"]
                      ? Blockly.Words["ntfy_anyInstance"][systemLang]
                      : "all instances",
                    "",
                  ],
                ];
                for (var i = 0; i < instances.length; i++) {
                  if (instances[i].startsWith("system.adapter.ntfy-sh.")) {
                    var shortId = instances[i].replace("system.adapter.", "");
                    result.push([shortId, shortId]);
                  }
                }
                return result.length > 1
                  ? result
                  : [
                      [
                        Blockly.Words["ntfy_anyInstance"]
                          ? Blockly.Words["ntfy_anyInstance"][systemLang]
                          : "all instances",
                        "",
                      ],
                    ];
              }
              var options = [
                [
                  Blockly.Words["ntfy_anyInstance"]
                    ? Blockly.Words["ntfy_anyInstance"][systemLang]
                    : "all instances",
                  "",
                ],
              ];
              for (var i = 0; i < 10; i++) {
                options.push([`ntfy-sh.${i}`, `ntfy-sh.${i}`]);
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

      this.appendValueInput("ACTIONS")
        .setCheck(["String", "Array"])
        .appendField(Blockly.Words["ntfy_actions"][systemLang]);

      this.appendValueInput("DELAY")
        .setCheck("String")
        .appendField(Blockly.Words["ntfy_delay"][systemLang]);

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
    if (value_actions && value_actions !== "''" && value_actions !== '""') {
      objArr.push(`actions: ${value_actions}`);
    }
    if (value_delay && value_delay !== "''" && value_delay !== '""') {
      objArr.push(`delay: ${value_delay}`);
    }
    if (checkbox_markdown) {
      objArr.push("markdown: true");
    }

    var code = `sendTo(${instance}, "send", {\n  ${objArr.join(
      ",\n  ",
    )}\n});\n`;
    return code;
  };
}

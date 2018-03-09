define(function(require, exports, module) {
  "use strict";

  var oop = require("../lib/oop");
  var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

  var EdemsMicrocodeAssemblyHighlightRules = function() {
    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used


    this.$rules = { start:
        [ { token: 'keyword.control.assembly',
          regex: '\\b(?:COOP|ALU|R>DB|R>AB|W>AB|DB>R|AB>W|INCB|DECB|INCW|DECW|JOI|JON|JOFI|JOFN|C>DB|SVR|SVW|O>DB|DB>O|END|JMP|RD|WT|SETB|RETB)\\b',
          caseInsensitive: true },
          { token: 'variable.parameter.register.assembly',
            regex: '\\b(?:A|B|C|D|E|F|S|P|TMP0|TMP1|TMP2|OP|PCH|PCL|UPCH|UPCL)\\b',
            caseInsensitive: true },
          { token: 'string.assembly',
            regex: '\\b(?:ADD|SUB|NEG|NOT|AND|ORR|XOR|SHR|SHL|ROR|ROL|RCR|RCL|ASR|ASL|BSR|BSL|EQU|OOP)\\b',
            caseInsensitive: true },
          { token: 'constant.character.decimal.assembly',
            regex: '\\b[0-9]+\\b' },
          { token: 'constant.character.hexadecimal.assembly',
            regex: '\\b0x[A-F0-9]+\\b',
            caseInsensitive: true },
          { token: 'constant.character.hexadecimal.assembly',
            regex: '\\b[A-F0-9]+h\\b',
            caseInsensitive: true },
          { token: 'constant.character.binary.assembly',
            regex: '\\b0b[0-1]+\\b',
            caseInsensitive: true },
          { token: 'comment.assembly', regex: ';.*$' } ]
    };

    this.normalizeRules();
  };

  EdemsMicrocodeAssemblyHighlightRules.metaData = { fileTypes: [ 'asm' ],
    name: 'Edems Microcode Assembly',
    scopeName: 'source.assembly' };


  oop.inherits(EdemsMicrocodeAssemblyHighlightRules, TextHighlightRules);

  exports.EdemsMicrocodeAssemblyHighlightRules = EdemsMicrocodeAssemblyHighlightRules;
});
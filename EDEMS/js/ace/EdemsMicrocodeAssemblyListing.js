ace.define("ace/mode/EdemsMicrocodeAssemblyListingHighlightRules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(acequire, exports, module) {
"use strict";

var oop = acequire("../lib/oop");
var TextHighlightRules = acequire("./text_highlight_rules").TextHighlightRules;

var EdemsMicrocodeAssemblyListingHighlightRules = function() {
  // regexp must not have capturing parentheses. Use (?:) instead.
  // regexps are ordered -> the first match is used

  this.$rules = { start:
      [ { token: 'constant.character.decimal.assembly',
        regex: '\\b[A-F0-9][A-F0-9][A-F0-9][A-F0-9]\ \ [A-F0-9][A-F0-9][A-F0-9]\\b' },
        { token: 'keyword.control.assembly',
        regex: '\\b(?:COOP|ALU|DB<R|AB<R|AB<W|DB>R|AB>W|INCB|DECB|INCW|DECW|JOI|JON|JOFI|JOFN|DB<C|SVR|SVW|DB<O|DB>O|END|JMP|RD|WT|SETB|RETB)\\b',
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
        { token : "string", // pre-compiler directives
          regex : "\\.def.*",
          caseInsensitive: true },
        { token: 'comment.assembly', regex: ';.*$' } ]
  };

  this.normalizeRules();
};

  EdemsMicrocodeAssemblyListingHighlightRules.metaData = { fileTypes: [ 'asm' ],
    name: 'Edems Microcode Assembly',
    scopeName: 'source.assembly' };


  oop.inherits(EdemsMicrocodeAssemblyListingHighlightRules, TextHighlightRules);

exports.EdemsMicrocodeAssemblyListingHighlightRules = EdemsMicrocodeAssemblyListingHighlightRules;
});

ace.define("ace/mode/EdemsMicrocodeAssemblyListing",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/EdemsMicrocodeAssemblyListingHighlightRules","ace/mode/folding/coffee"], function(acequire, exports, module) {
"use strict";

var oop = acequire("../lib/oop");
var TextMode = acequire("./text").Mode;
var EdemsMicrocodeAssemblyListingHighlightRules = acequire("./EdemsMicrocodeAssemblyListingHighlightRules").EdemsMicrocodeAssemblyListingHighlightRules;

var Mode = function() {
    this.HighlightRules = EdemsMicrocodeAssemblyListingHighlightRules;
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {
    this.lineCommentStart = ";";
    this.$id = "ace/mode/EdemsMicrocodeAssemblyListing";
}).call(Mode.prototype);

exports.Mode = Mode;
});

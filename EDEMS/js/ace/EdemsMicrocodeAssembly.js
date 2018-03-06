ace.define("ace/mode/EdemsMicrocodeAssemblyHighlightRules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(acequire, exports, module) {
"use strict";

var oop = acequire("../lib/oop");
var TextHighlightRules = acequire("./text_highlight_rules").TextHighlightRules;

var EdemsMicrocodeAssemblyHighlightRules = function() {
  // regexp must not have capturing parentheses. Use (?:) instead.
  // regexps are ordered -> the first match is used

  this.$rules = { start:
      [ { token: 'keyword.control.assembly',
        regex: '\\b(?:COOP|ALU|R>DB|R>AB|W>AB|DB>R|AB>W|INCB|DECB|INCW|DECW|JOI|JON|JOFI|JOFN|C>DB|SVR|SVW|O>DB|DB>O|END|JMP|HLT|READ|WRT|SETB|RETB)\\b',
        caseInsensitive: true },
        { token: 'variable.parameter.register.assembly',
          regex: '\\b(?:A|B|C|D|E|F|S|P|TMP0|TMP1|TMP2|OP|PCH|PCL|UPCH|UPCL)\\b',
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

ace.define("ace/mode/folding/coffee",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode","ace/range"], function(acequire, exports, module) {
"use strict";

var oop = acequire("../../lib/oop");
var BaseFoldMode = acequire("./fold_mode").FoldMode;
var Range = acequire("../../range").Range;

var FoldMode = exports.FoldMode = function() {};
oop.inherits(FoldMode, BaseFoldMode);

(function() {

    this.getFoldWidgetRange = function(session, foldStyle, row) {
        var range = this.indentationBlock(session, row);
        if (range)
            return range;

        var re = /\S/;
        var line = session.getLine(row);
        var startLevel = line.search(re);
        if (startLevel == -1 || line[startLevel] != "#")
            return;

        var startColumn = line.length;
        var maxRow = session.getLength();
        var startRow = row;
        var endRow = row;

        while (++row < maxRow) {
            line = session.getLine(row);
            var level = line.search(re);

            if (level == -1)
                continue;

            if (line[level] != "#")
                break;

            endRow = row;
        }

        if (endRow > startRow) {
            var endColumn = session.getLine(endRow).length;
            return new Range(startRow, startColumn, endRow, endColumn);
        }
    };
    this.getFoldWidget = function(session, foldStyle, row) {
        var line = session.getLine(row);
        var indent = line.search(/\S/);
        var next = session.getLine(row + 1);
        var prev = session.getLine(row - 1);
        var prevIndent = prev.search(/\S/);
        var nextIndent = next.search(/\S/);

        if (indent == -1) {
            session.foldWidgets[row - 1] = prevIndent!= -1 && prevIndent < nextIndent ? "start" : "";
            return "";
        }
        if (prevIndent == -1) {
            if (indent == nextIndent && line[indent] == "#" && next[indent] == "#") {
                session.foldWidgets[row - 1] = "";
                session.foldWidgets[row + 1] = "";
                return "start";
            }
        } else if (prevIndent == indent && line[indent] == "#" && prev[indent] == "#") {
            if (session.getLine(row - 2).search(/\S/) == -1) {
                session.foldWidgets[row - 1] = "start";
                session.foldWidgets[row + 1] = "";
                return "";
            }
        }

        if (prevIndent!= -1 && prevIndent < indent)
            session.foldWidgets[row - 1] = "start";
        else
            session.foldWidgets[row - 1] = "";

        if (indent < nextIndent)
            return "start";
        else
            return "";
    };

}).call(FoldMode.prototype);

});

ace.define("ace/mode/EdemsMicrocodeAssembly",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/EdemsMicrocodeAssemblyHighlightRules","ace/mode/folding/coffee"], function(acequire, exports, module) {
"use strict";

var oop = acequire("../lib/oop");
var TextMode = acequire("./text").Mode;
var EdemsMicrocodeAssemblyHighlightRules = acequire("./EdemsMicrocodeAssemblyHighlightRules").EdemsMicrocodeAssemblyHighlightRules;
var FoldMode = acequire("./folding/coffee").FoldMode;

var Mode = function() {
    this.HighlightRules = EdemsMicrocodeAssemblyHighlightRules;
    this.foldingRules = new FoldMode();
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {
    this.lineCommentStart = ";";
    this.$id = "ace/mode/EdemsMicrocodeAssembly";
}).call(Mode.prototype);

exports.Mode = Mode;
});

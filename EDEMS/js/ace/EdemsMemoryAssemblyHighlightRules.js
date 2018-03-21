define(function(require, exports, module) {
  "use strict";

  var oop = require("../lib/oop");
  var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

  var EdemsMemoryAssemblyHighlightRules = function() {
    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used


    this.$rules = { start:
        [ { token: 'keyword.control.assembly',
          regex: '^[0-9]{2}$',
          caseInsensitive: true },
          { token: 'comment.assembly', regex: ';.*$' } ]
    };

    this.normalizeRules();
  };

  EdemsMemoryAssemblyHighlightRules.metaData = { fileTypes: [ 'asm' ],
    name: 'Edems Memory Assembly',
    scopeName: 'source.assembly' };


  oop.inherits(EdemsMemoryAssemblyHighlightRules, TextHighlightRules);

  exports.EdemsMemoryAssemblyHighlightRules = EdemsMemoryAssemblyHighlightRules;
});
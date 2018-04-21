ace.define('ace/mode/EdemsMemoryAssemblyListingHighlightRules', ['require', 'exports', 'module', 'ace/lib/oop', 'ace/mode/text_highlight_rules'], function (acequire, exports, module) {
  'use strict'

  var oop = acequire('../lib/oop')
  var TextHighlightRules = acequire('./text_highlight_rules').TextHighlightRules

  var EdemsMemoryAssemblyListingHighlightRules = function () {
    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used
    var keywords = ''
    for (var i = 0; i < uComp.assemblyKeywords.length; i++) {
      keywords += '|' + uComp.assemblyKeywords[i].keyword
    }
    if (keywords === '') {
      keywords = '|(?!.*)'
    }

    this.$rules = {
      start:
        [ { token: 'comment.assembler',
          regex: '\\b^[A-F0-9][A-F0-9][A-F0-9][A-F0-9]\ \ [A-F0-9][A-F0-9]\ \ [A-F0-9][A-F0-9]\ \ [A-F0-9][A-F0-9]\\b' },
          { token: 'constant.character.decimal.assembly',
            regex: '\\b^[A-F0-9][A-F0-9][A-F0-9][A-F0-9]\ \ [A-F0-9][A-F0-9]\ \ [A-F0-9][A-F0-9]\\b' },
          { token: 'constant.character.decimal.assembly',
            regex: '\\b^[A-F0-9][A-F0-9][A-F0-9][A-F0-9]\ \ [A-F0-9][A-F0-9]\\b' },
          { token: 'constant.character.decimal.assembly',
            regex: '\\b^[A-F0-9][A-F0-9][A-F0-9][A-F0-9]\\b' },

          { token: 'comment.assembly',
            regex: '\\b^[A-F0-9][A-F0-9][A-F0-9][A-F0-9]\ \ ..\ \ [A-F0-9][A-F0-9]\\b' },
          { token: 'comment.assembly',
            regex: '\\b^[A-F0-9][A-F0-9][A-F0-9][A-F0-9]\ \ ..\ \ ..\ \ [A-F0-9][A-F0-9]\\b' },
          {
            token: 'keyword.control.assembly',
            regex: '\\b(?:' + keywords.substring(1, keywords.length) + ')\\b',
            caseInsensitive: true
          },
          /*{ token: 'keyword.control.assembly',
          regex: '^[0-9]{2}$',
          caseInsensitive: true },*/
          {
            token: 'constant.character.decimal.assembly',
            regex: '\\b[0-9]+\\b'
          },
          {
            token: 'constant.character.hexadecimal.assembly',
            regex: '\\b0x[A-F0-9]+\\b',
            caseInsensitive: true
          },
          {
            token: 'constant.character.hexadecimal.assembly',
            regex: '\\b[A-F0-9]+h\\b',
            caseInsensitive: true
          },
          {
            token: 'constant.character.binary.assembly',
            regex: '\\b0b[0-1]+\\b',
            caseInsensitive: true
          },
          {
            token: 'string', // pre-compiler directives
            regex: '\\.org.*|\\.const.*',
            caseInsensitive: true
          },
          {token: 'comment.assembly', regex: ';.*$'}]
    }

    this.normalizeRules()
  }

  EdemsMemoryAssemblyListingHighlightRules.metaData = {
    fileTypes: ['asm'],
    name: 'Edems Memory Assembly',
    scopeName: 'source.assembly'
  }

  oop.inherits(EdemsMemoryAssemblyListingHighlightRules, TextHighlightRules)

  exports.EdemsMemoryAssemblyListingHighlightRules = EdemsMemoryAssemblyListingHighlightRules
})

ace.define('ace/mode/EdemsMemoryAssemblyListing', ['require', 'exports', 'module', 'ace/lib/oop', 'ace/mode/text', 'ace/mode/EdemsMemoryAssemblyListingHighlightRules', 'ace/mode/folding/coffee'], function (acequire, exports, module) {
  'use strict'

  var oop = acequire('../lib/oop')
  var TextMode = acequire('./text').Mode
  var EdemsMemoryAssemblyListingHighlightRules = acequire('./EdemsMemoryAssemblyListingHighlightRules').EdemsMemoryAssemblyListingHighlightRules

  var Mode = function () {
    this.HighlightRules = EdemsMemoryAssemblyListingHighlightRules
    this.$behaviour = this.$defaultBehaviour
  }
  oop.inherits(Mode, TextMode);

  (function () {
    this.lineCommentStart = ';'
    this.$id = 'ace/mode/EdemsMemoryAssemblyListing'
  }).call(Mode.prototype)

  exports.Mode = Mode
})

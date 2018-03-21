var global = require('./globals.js')
var BinNumber = require('./binNumber.js')

var memoryCompiler = {}

memoryCompiler.compile = function (input) {
  var output = []

  input = input.toUpperCase()
    .replace(/^[\s\n]+|[\s\n]+$/, '\n')
    .split('\n')

  for (var i = 0; i < input.length; i++) {
    var line = input[i].trim().split(' ')
    if (line[0].match(/^[0-9]{2}$/)) {
      output.push(line[0])
    } else {
      throw SyntaxError('Error on line: ' + (i + 1) + line[0] + ' is not a valid keyword.')
    }
  }
  return output
}

module.exports = memoryCompiler


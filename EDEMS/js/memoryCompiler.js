var global = require('./globals.js')
var BinNumber = require('./binNumber.js')

var memoryCompiler = {}

memoryCompiler.compile = function (input) {
  var output = {'0': []}
  var pointer = '0'
  var instruction = {}
  var operand

  input = input.toUpperCase()
    .replace(/^[\s\n]+|[\s\n]+$/, '\n')
    .split('\n')

  for (var i = 0; i < input.length; i++) {
    var line = input[i].trim().split(' ')

    if (line[0] === '.ORG') {
      output[line[1].toString()] = []
      pointer = line[1].toString()
    } else if (line[0] === '') {
    } else {
      instruction = uComp.assemblyKeywords.find(x => x.keyword === line[0])
      if (instruction === undefined) {
        throw SyntaxError('Error on line ' + (i + 1) + ': ' + line[0] + ' is not a valid keyword.')
      }

      output[pointer].push(instruction.address)

      if (instruction.operand !== undefined) {
        try {
          operand = parseNumber(line[1], 8 * parseInt(instruction.operand.substring(0, instruction.operand.length - 1)))
        }catch (x){
          throw SyntaxError('Error on line ' + (i + 1) + ': ' + line[1] + ' is not a valid address.')
        }
        while (operand.length > 0) {
          output[pointer].push(operand.slice(-2))
          operand = operand.slice(0, -2)
        }
      }
    }
  }
  return output
}

function parseNumber (input, bits) {
  input = input.toLowerCase()
  var output = {}
  if (isNaN(input)) {
    try {
      output = new BinNumber(input, bits)
    } catch (err) {
      console.log(err)
      throw SyntaxError(input + ' is not a valid number')
    }
  } else if (input) {
    try {
      output = new BinNumber(+input, bits)
    } catch (err) {
      console.log(err)
      throw SyntaxError(input + ' is not a valid number')
    }
  }
  if (isNaN(output.dec)) {
    throw SyntaxError(input + ' is not a valid number')
  }
  return output.hex
}

module.exports = memoryCompiler


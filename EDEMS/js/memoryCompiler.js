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
      try {
        output[parseNumber(line[1], 8).toString()] = []
        pointer = parseNumber(line[1], 8).toString()
      } catch (x) {
        throw SyntaxError('Error on line ' + (i + 1) + ': ' + line[1] + ' is not a valid address.')
      }
    } else if (line[0] === '.CONST') {
      try {
        output[pointer].push(parseNumber(line[1], 8))
      } catch (x) {
        throw SyntaxError('Error on line ' + (i + 1) + ': ' + line[1] + ' is not a valid address.')
      }
    } else if (line[0] === '') {
    } else {
      instruction = uComp.assemblyKeywords.find(x => x.keyword === line[0])
      if (instruction === undefined) {
        throw SyntaxError('Error on line ' + (i + 1) + ': ' + line[0] + ' is not a valid keyword.')
      }

      output[pointer].push(instruction.address.toString(16))

      if (instruction.operand !== undefined) {
        try {
          operand = parseHEX(line[1], 8 * parseInt(instruction.operand.substring(0, instruction.operand.length - 1)))
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

function parseHEX (input, bits) {
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
  return output.dec
}

module.exports = memoryCompiler


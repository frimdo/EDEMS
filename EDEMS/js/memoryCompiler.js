var global = require('./globals.js')
var BinNumber = require('./binNumber.js')

var memoryCompiler = {}

memoryCompiler.compile = function (input) {
  var output = {'0': []}
  var pointer = '0'

  var listing = ''
  var instruction = {}
  var operand

  var inputRaw = input
    .replace(/^[\s\n]+|[\s\n]+$/, '\n')
    .split('\n')

  input = input.toUpperCase()
    .replace(/^[\s\n]+|[\s\n]+$/, '\n')
    .split('\n')

  for (var i = 0; i < input.length; i++) {
    var line = input[i].trim().split(' ')
    var address = '    '
    var code = ''

    if (line[0] === '.ORG') {
      try {
        output[parseNumber(line[1], 8).toString()] = []
        pointer = parseNumber(line[1], 8).toString()
      } catch (x) {
        throw SyntaxError('Error on line ' + (i + 1) + ': ' + line[1] + ' is not a valid address.')
      }

    } else if (line[0] === '.CONST') {
      try {
        output[pointer].push(parseHEX(line[1], 8))
        address = ('0000' + (+pointer + output[pointer].length - 1).toString(16)).slice(-4)
      } catch (x) {
        throw SyntaxError('Error on line ' + (i + 1) + ': ' + line[1] + ' is not a valid address.')
      }

    } else if (line[0] === '') {

    } else if (line[0].substring(0, 1) === ';') {

    } else {
      instruction = uComp.assemblyKeywords.find(x => x.keyword === line[0])
      if (instruction === undefined) {
        throw SyntaxError('Error on line ' + (i + 1) + ': ' + line[0] + ' is not a valid keyword.')
      }

      var instructionAddress = instruction.address.toString(16)
      output[pointer].push('0'.repeat(2 - instructionAddress.length) + instructionAddress)
      address = ('0000' + (+pointer + output[pointer].length - 1).toString(16)).slice(-4)
      code = ('00' + (output[pointer][output[pointer].length - 1])).slice(-2)

      if (instruction.operand !== undefined) {
        try {
          operand = parseHEX(line[1], 8 * parseInt(instruction.operand.substring(0, instruction.operand.length - 1)))
        } catch (x) {
          throw SyntaxError('Error on line ' + (i + 1) + ': ' + line[1] + ' is not a valid address.')
        }
        while (operand.length > 0) {
          output[pointer].push(operand.slice(-2))
          code +=' ' + ('00' + (output[pointer][output[pointer].length - 1])).slice(-2)
          operand = operand.slice(0, -2)
        }
      }
    }

    code =  code + ' '.repeat(8 - code.length)
    listing = listing
      + address
      + '  '
      + code
      + '  '
      + inputRaw[i]
      + '\n'
  }

  return {output, listing}
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


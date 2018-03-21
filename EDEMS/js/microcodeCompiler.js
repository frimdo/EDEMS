var global = require('./globals.js')
var BinNumber = require('./binNumber.js')

var microcodeCompiler = {}

microcodeCompiler.compile = function (input) {
  var output = []
  var lowRegisters = ['A', 'C', 'E', 'P', 'PCL', 'OP', 'TMP2', 'UPCL', '4', '5', '6', '7', '12', '13', '14', '15']

  input = input.toUpperCase()
    .replace(/^[\s\n]+|[\s\n]+$/, '\n')
    .split('\n')
  for (var i = 0; i < input.length; i++) {
    var line = input[i].trim().split(' ')
    switch (line[0]) {
      case ('COOP'):
        var byte = 1536
        try {
          byte += parseNumber(line[1], 8)
          output.push(byte.toString(16))
        } catch (err) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + err.message)
        }
        break
      case ('ALU'):
        operations = {
          'ADD': 0,
          'SUB': 1,
          'NEG': 2,
          'NOT': 3,
          'AND': 4,
          'ORR': 5,
          'XOR': 6,
          'SHR': 7,
          'SHL': 8,
          'ROR': 9,
          'ROL': 10,
          'RCR': 11,
          'RCL': 12,
          'ASR': 13,
          'ASL': 14,
          'BSR': 15,
          'BSL': 16,
          'EQU': 17,
          'OOP': 18
        }
        try {
          output.push('00' + operations[line[1]])
        } catch (err) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + line[1] + 'is not valid ALU operation.')
        }
        break
      case ('R>DB'):
        try {
          output.push('7C' + global.register(line[1]))
        } catch (err) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + err.message)
        }
        break
      case ('R>AB'):
        try {
          output.push('7B' + global.register(line[1]))
        } catch (err) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + err.message)
        }
        break
      case ('W>AB'):
        if (lowRegisters.includes(line[1])) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + line[1] + ' is low register of pair.')
        }
        try {
          output.push('7A' + global.register(line[1]))
        } catch (err) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + err.message)
        }
        break
      case ('DB>R'):
        try {
          output.push('79' + global.register(line[1]))
        } catch (err) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + err.message)
        }
        break
      case ('AB>W'):
        if (lowRegisters.includes(line[1])) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + line[1] + ' is low register of pair.')
        }
        try {
          output.push('78' + global.register(line[1]))
        } catch (err) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + err.message)
        }
        break
      case ('INCB'):
        try {
          output.push('77' + global.register(line[1]))
        } catch (err) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + err.message)
        }
        break
      case ('DECB'):
        try {
          output.push('76' + global.register(line[1]))
        } catch (err) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + err.message)
        }
        break
      case ('INCW'):
        if (lowRegisters.includes(line[1])) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + line[1] + ' is low register of pair.')
        }
        try {
          output.push('75' + global.register(line[1]))
        } catch (err) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + err.message)
        }
        break
      case ('DECW'):
        if (lowRegisters.includes(line[1])) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + line[1] + ' is low register of pair.')
        }
        try {
          output.push('74' + global.register(line[1]))
        } catch (err) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + err.message)
        }
        break
      case ('JOI'):
        try {
          output.push('73' + global.register(line[1]))
        } catch (err) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + err.message)
        }
        break
      case ('JON'):
        try {
          output.push('72' + global.register(line[1]))
        } catch (err) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + err.message)
        }
        break
      case ('JOFI'):
        try {
          output.push('71' + global.register(line[1]))
        } catch (err) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + err.message)
        }
        break
      case ('JOFN'):
        try {
          output.push('70' + global.register(line[1]))
        } catch (err) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + err.message)
        }
        break
      case ('C>DB'):
        var byte = 1280
        try {
          byte += parseNumber(line[1], 8)
          output.push(byte.toString(16))
        } catch (err) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + err.message)
        }
        break
      case ('SVR'):
        var byte = '1'
        try {
          byte += global.register(line[1])
        } catch (err) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + err.message)
        }
        try {
          output.push(byte += global.register(line[2]))
        } catch (err) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + err.message)
        }
        break
      case ('SVW'):
        if (lowRegisters.includes(line[1])) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + line[1] + ' is low register of pair.')
        }
        var byte = '2'
        try {
          byte += global.register(line[1])
        } catch (err) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + err.message)
        }
        if (lowRegisters.includes(line[1])) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + line[2] + ' is low register of pair.')
        }
        try {
          output.push(byte += global.register(line[2]))
        } catch (err) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + err.message)
        }
        break
      case ('O>DB'):
        output.push('7F0')
        break
      case ('DB>O'):
        output.push('7F1')
        break
      case ('END'):
        output.push('7F2')
        break
      case ('JMP'):
        var byte = 2048
        try {
          byte += parseNumber(line[1], 11)
          output.push(byte.toString(16))
        } catch (err) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + err.message)
        }
        break
      case ('RD'):
        output.push('7F4')
        break
      case ('WT'):
        output.push('7F5')
        break
      case ('SETB'):
        var byte = '3'
        try {
          byte += global.register(line[1])
        } catch (err) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + err.message)
        }
        try {
          output.push(byte + parseNumber(line[2], 3))
        } catch (err) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + err.message)
        }
        break
      case ('RETB'):
        var byte = '4'
        try {
          byte += global.register(line[1])
        } catch (err) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + err.message)
        }
        try {
          output.push(byte + parseNumber(line[2], 3))
        } catch (err) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + err.message)
        }
        break
      case (''):
        break
      default:
        if (line[0].substring(0, 1) === ';') {
          break
        }
        throw SyntaxError('Error on line ' + (i + 1) + ': ' + line[0] + ' is not a valid keyword.')
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
  return output.dec
}

module.exports = microcodeCompiler


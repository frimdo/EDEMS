var global = require('./globals.js')
var BinNumber = require('./binNumber.js')

var microcodeCompiler = {}

microcodeCompiler.compile = function (input) {
  var output = []
  var lowRegisters = ['A', 'C', 'E', 'P', 'PCL', 'OP', 'TMP2', 'UPCL', '6', '3', '4', '5', '9', '13', '14', '15']

  input = input.toUpperCase()
    .replace(/^[\s\n]+|[\s\n]+$/, '\n')
    .split('\n')
  console.log(input)
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
        output.push('000')
        console.log(line[0], 'This uInstruction is not implemented yet.')
        //TODO: implementovat
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
      case ('HLT'):
        output.push('7F3')
        break
      case ('READ'):
        output.push('7F4')
        break
      case ('WRT'):
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
        throw SyntaxError('Error on line: ' + (i + 1) + line[0] + ' is not a valid keyword.')
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


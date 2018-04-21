var global = require('./globals.js')
var BinNumber = require('./binNumber.js')

var microcodeCompiler = {}

microcodeCompiler.compile = function (input) {
  var output = []
  var listing = ''

  var pairs = {
    FA: 'F',
    F: 'F',
    BC: 'B',
    B: 'B',
    DE: 'D',
    D: 'D',
    SP: 'S',
    S: 'S',
    PC: 'PCH',
    PCH: 'PCH',
    PCHPCL: 'PCH',
    TMP0OP: 'TMP0',
    TMPOP: 'TMP0',
    TMP0: 'TMP0',
    OP: 'OP',
    TMP: 'TMP1',
    TMP1TMP2: 'TMP1',
    TMP1: 'TMP1',
    UPC: 'UPCH',
    UPCH: 'UPCH',
    UPCHUPCL: 'UPCH'
  }

  var inputRaw = input
    .replace(/^[\s\n]+|[\s\n]+$/, '\n')
    .split('\n')
  input = input
    .toUpperCase()
    .replace(/^[\s\n]+|[\s\n]+$/, '\n')
    .split('\n')

  for (var i = 0; i < input.length; i++) {
    var line = input[i].trim().split(' ')
    var address = '    '
    var code = '   '

    switch (line[0]) {
      case ('COOP'):
        var byte = 1536
        try {
          byte += parseNumber(line[1], 8)
          output.push(byte.toString(16))

          address = ('0000' + (output.length - 1).toString(16)).slice(-4)
          code = ('000' + (output[output.length - 1])).slice(-3)

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
        if (operations[line[1]] === undefined) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + line[1] + ' is not valid ALU operation.')
        }
        try {
          output.push('00' + operations[line[1]])

          address = ('0000' + (output.length - 1).toString(16)).slice(-4)
          code = ('000' + (output[output.length - 1])).slice(-3)
        } catch (err) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + line[1] + ' is not valid ALU operation.')
        }
        break

      case ('DB<R'):
        try {
          output.push('7C' + global.register(line[1]))
          address = ('0000' + (output.length - 1).toString(16)).slice(-4)
          code = ('000' + (output[output.length - 1])).slice(-3)
        } catch (err) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + err.message)
        }
        break

      case ('AB<R'):
        try {
          output.push('7B' + global.register(line[1]))
          address = ('0000' + (output.length - 1).toString(16)).slice(-4)
          code = ('000' + (output[output.length - 1])).slice(-3)
        } catch (err) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + err.message)
        }
        break

      case ('AB<W'):
        var highRegister = pairs[line[1]]
        if (highRegister === undefined) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + line[1] + ' is not register pair name.')
        }
        try {
          output.push('7A' + global.register(highRegister))
          address = ('0000' + (output.length - 1).toString(16)).slice(-4)
          code = ('000' + (output[output.length - 1])).slice(-3)
        } catch (err) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + err.message)
        }
        break

      case ('DB>R'):
        try {
          output.push('79' + global.register(line[1]))
          address = ('0000' + (output.length - 1).toString(16)).slice(-4)
          code = ('000' + (output[output.length - 1])).slice(-3)
        } catch (err) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + err.message)
        }
        break

      case ('AB>W'):
        var highRegister = pairs[line[1]]
        if (highRegister === undefined) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + line[1] + ' is low register of pair.')
        }
        try {
          output.push('78' + global.register(highRegister))
          address = ('0000' + (output.length - 1).toString(16)).slice(-4)
          code = ('000' + (output[output.length - 1])).slice(-3)
        } catch (err) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + err.message)
        }
        break

      case ('INCB'):
        try {
          output.push('77' + global.register(line[1]))
          address = ('0000' + (output.length - 1).toString(16)).slice(-4)
          code = ('000' + (output[output.length - 1])).slice(-3)
        } catch (err) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + err.message)
        }
        break

      case ('DECB'):
        try {
          output.push('76' + global.register(line[1]))
          address = ('0000' + (output.length - 1).toString(16)).slice(-4)
          code = ('000' + (output[output.length - 1])).slice(-3)
        } catch (err) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + err.message)
        }
        break

      case ('INCW'):
        var highRegister = pairs[line[1]]
        if (highRegister === undefined) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + line[1] + ' is low register of pair.')
        }
        try {
          output.push('75' + global.register(highRegister))
          address = ('0000' + (output.length - 1).toString(16)).slice(-4)
          code = ('000' + (output[output.length - 1])).slice(-3)
        } catch (err) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + err.message)
        }
        break

      case ('DECW'):
        var highRegister = pairs[line[1]]
        if (highRegister === undefined) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + line[1] + ' is low register of pair.')
        }
        try {
          output.push('74' + global.register(highRegister))
          address = ('0000' + (output.length - 1).toString(16)).slice(-4)
          code = ('000' + (output[output.length - 1])).slice(-3)
        } catch (err) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + err.message)
        }
        break

      case ('JOI'):
        try {
          output.push('73' + global.register(line[1]))
          address = ('0000' + (output.length - 1).toString(16)).slice(-4)
          code = ('000' + (output[output.length - 1])).slice(-3)
        } catch (err) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + err.message)
        }
        break

      case ('JON'):
        try {
          output.push('72' + global.register(line[1]))
          address = ('0000' + (output.length - 1).toString(16)).slice(-4)
          code = ('000' + (output[output.length - 1])).slice(-3)
        } catch (err) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + err.message)
        }
        break

      case ('JOFI'):
        try {
          output.push('71' + global.register(line[1]))
          address = ('0000' + (output.length - 1).toString(16)).slice(-4)
          code = ('000' + (output[output.length - 1])).slice(-3)
        } catch (err) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + err.message)
        }
        break

      case ('JOFN'):
        try {
          output.push('70' + global.register(line[1]))
          address = ('0000' + (output.length - 1).toString(16)).slice(-4)
          code = ('000' + (output[output.length - 1])).slice(-3)
        } catch (err) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + err.message)
        }
        break

      case ('DB<C'):
        var byte = 1280
        try {
          byte += parseNumber(line[1], 8)
          output.push(byte.toString(16))
          address = ('0000' + (output.length - 1).toString(16)).slice(-4)
          code = ('000' + (output[output.length - 1])).slice(-3)
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
          address = ('0000' + (output.length - 1).toString(16)).slice(-4)
          code = ('000' + (output[output.length - 1])).slice(-3)
        } catch (err) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + err.message)
        }
        break

      case ('SVW'):
        var highRegister1 = pairs[line[1]]
        if (highRegister1 === undefined) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + line[1] + ' is low register of pair.')
        }
        var byte = '2'
        try {
          byte += global.register(highRegister1)
        } catch (err) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + err.message)
        }

        var highRegister2 = pairs[line[2]]
        if (highRegister2 === undefined) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + line[2] + ' is low register of pair.')
        }
        try {
          output.push(byte += global.register(highRegister2))
          address = ('0000' + (output.length - 1).toString(16)).slice(-4)
          code = ('000' + (output[output.length - 1])).slice(-3)
        } catch (err) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + err.message)
        }
        break

      case ('DB<O'):
        output.push('7F0')
        address = ('0000' + (output.length - 1).toString(16)).slice(-4)
        code = ('000' + (output[output.length - 1])).slice(-3)
        break

      case ('DB>O'):
        output.push('7F1')
        address = ('0000' + (output.length - 1).toString(16)).slice(-4)
        code = ('000' + (output[output.length - 1])).slice(-3)
        break

      case ('END'):
        output.push('7F2')
        address = ('0000' + (output.length - 1).toString(16)).slice(-4)
        code = ('000' + (output[output.length - 1])).slice(-3)
        break

      case ('JMP'):
        var byte = 2048
        try {
          byte += parseNumber(line[1], 11)
          output.push(byte.toString(16))
          address = ('0000' + (output.length - 1).toString(16)).slice(-4)
          code = ('000' + (output[output.length - 1])).slice(-3)
        } catch (err) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + err.message)
        }
        break

      case ('RD'):
        output.push('7F4')
        address = ('0000' + (output.length - 1).toString(16)).slice(-4)
        code = ('000' + (output[output.length - 1])).slice(-3)
        break

      case ('WT'):
        output.push('7F5')
        address = ('0000' + (output.length - 1).toString(16)).slice(-4)
        code = ('000' + (output[output.length - 1])).slice(-3)
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
          address = ('0000' + (output.length - 1).toString(16)).slice(-4)
          code = ('000' + (output[output.length - 1])).slice(-3)
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
          address = ('0000' + (output.length - 1).toString(16)).slice(-4)
          code = ('000' + (output[output.length - 1])).slice(-3)
        } catch (err) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + err.message)
        }
        break

      case ('.DEF'):

        var byte = 2048
        try {
          byte += parseNumber(line[1], 11)
          byte = byte.toString(16)
        } catch (err) {
          throw SyntaxError('Error on line: ' + (i + 1) + ' ' + err.message)
        }

        if (line[2] === undefined || line[2].length === 0) {
          throw SyntaxError('Error on line ' + (i + 1) + ': keyword not defined')
        }
        var keyword = line[2]
        if (line[3] === undefined || line[3].length === 0) {
          microcodeCompiler.assemblyKeywords.push({
            keyword: keyword,
            address: microcodeCompiler.assemblyKeywords.length
          })
        } else if (line[3].match(/[0-9]+B/g) === null) {
          throw SyntaxError('Error on line ' + (i + 1) + ': ' + line[3] + ' is wrong number of operands.')
        } else {
          microcodeCompiler.assemblyKeywords.push({
            keyword: keyword,
            address: microcodeCompiler.assemblyKeywords.length,
            operand: line[3]
          })
        }
        output.push(byte)
        address = ('0000' + (output.length - 1).toString(16)).slice(-4)
        code = ('000' + (output[output.length - 1])).slice(-3)
        break

      case (''):
        break

      default:
        if (line[0].substring(0, 1) === ';') {
          break
        }
        throw SyntaxError('Error on line ' + (i + 1) + ': ' + line[0] + ' is not a valid keyword.')

    }
    listing = listing
      + address
      + ' '
      + code
      + ' '
      + inputRaw[i]
      + '\n'
  }
  return {output, listing}
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

microcodeCompiler.assemblyKeywords = []

module.exports = microcodeCompiler


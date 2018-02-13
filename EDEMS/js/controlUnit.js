var global = require('./globals.js')
var CU = {}

CU.doUInstruction = function (afterUInstruction) {
  try {
    var opcode = CU.decode(global.microcode[global.registerUPCH.decPair])

    switch (opcode.Name) {
      default:
        console.log(opcode)
        break
    }
  } catch(err) {
    console.log('CU:', err)
  }

  global.registerUPCH.incrPair()

  afterUInstruction()
}

CU.decode = function (opcode) {
  if (opcode.length !== 3) {
    throw new Error('wrong opcode: 0x' + opcode)
  }
  switch (opcode.charAt(0)) {
    case '1':
      return {Name: 'SVR', operand1: opcode.substring(1, 3)}
    case '2':
      return {Name: 'SVW', operand1: opcode.substring(1, 3)}
    case '3':
      return {Name: 'SETB', operand1: opcode.substring(1, 3)}
    case '4':
      return {Name: 'RETB', operand1: opcode.substring(1, 3)}
    case '5':
      return {Name: 'C>DB', operand1: opcode.substring(1, 3)}
    case '6':
      return {Name: 'COOP', operand1: opcode.substring(1, 3)}
    case '0':
      return {Name: 'ALU', operand1: opcode.substring(1, 3)}
    case '8':
      return {Name: 'JMP', operand1: opcode.substring(1, 3)}
    case '7':
      switch (opcode.charAt(1)) {
        case '0':
          return {Name: 'JOFN ', operand1: opcode.charAt(2)}
        case '1':
          return {Name: 'JOFI ', operand1: opcode.charAt(2)}
        case '2':
          return {Name: 'JON ', operand1: opcode.charAt(2)}
        case '3':
          return {Name: 'JOI ', operand1:opcode.charAt(2)}
        case '4':
          return {Name: 'DECW ', operand1:opcode.charAt(2)}
        case '5':
          return {Name: 'INCW ', operand1:opcode.charAt(2)}
        case '6':
          return {Name: 'DECB ', operand1:opcode.charAt(2)}
        case '7':
          return {Name: 'INCB ', operand1:opcode.charAt(2)}
        case '8':
          return {Name: 'AB>W ', operand1:opcode.charAt(2)}
        case '9':
          return {Name: 'DB>R ', operand1:opcode.charAt(2)}
        case 'A':
          return {Name: 'W>AB ', operand1:opcode.charAt(2)}
        case 'B':
          return {Name: 'R>AB ', operand1:opcode.charAt(2)}
        case 'C':
          return {Name: 'R>DB ', operand1:opcode.charAt(2)}
        case 'D':
          return {Name: 'ZROS ', operand1:opcode.charAt(2)}
        case 'F':
          switch (opcode.charAt(2)) {
            case '0':
              return {Name: 'O>DB'}
            case '1':
              return {Name: 'DB>O'}
            case '2':
              return {Name: 'END'}
            case '3':
              return {Name: 'HLT'}
            case '4':
              return {Name: 'READ'}
            case '5':
              return {Name: 'WRT'}
            default:
              throw new Error('wrong opcode: 0x' + opcode)
          }
        default:
          throw new Error('wrong opcode: 0x' + opcode)
      }
    default:
      throw new Error('wrong opcode: 0x' + opcode)
  }
}

module.exports = CU

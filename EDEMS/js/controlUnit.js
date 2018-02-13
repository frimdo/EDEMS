var global = require('./globals.js')
var CU = {}

CU.doUInstruction = function () {
  var opcode = global.microcode[global.registerUPCH.decPair]
  console.log('CU: ', opcode, '=', CU.decode(opcode))

  global.registerUPCH.incrPair()
}

CU.decode = function (opcode) {
  if (opcode.length !== 3) {
    return 'Wrong opcode'
  }
  switch (opcode.charAt(0)) {
    case '1':
      return 'SVR ' + opcode.substring(1, 3)
    case '2':
      return 'SVW ' + opcode.substring(1, 3)
    case '3':
      return 'SETB ' + opcode.substring(1, 3)
    case '4':
      return 'RETB ' + opcode.substring(1, 3)
    case '5':
      return 'C>DB ' + opcode.substring(1, 3)
    case '6':
      return 'COOP ' + opcode.substring(1, 3)
    case '0':
      return 'ALU ' + opcode.substring(1, 3)
    case '8':
      return 'JMP ' + opcode.substring(1, 3)
    case '7':
      switch (opcode.charAt(1)) {
        case '0':
          return 'JOFN ' + opcode.charAt(2)
        case '1':
          return 'JOFI ' + opcode.charAt(2)
        case '2':
          return 'JON ' + opcode.charAt(2)
        case '3':
          return 'JOI ' + opcode.charAt(2)
        case '4':
          return 'DECW ' + opcode.charAt(2)
        case '5':
          return 'INCW ' + opcode.charAt(2)
        case '6':
          return 'DECB ' + opcode.charAt(2)
        case '7':
          return 'INCB ' + opcode.charAt(2)
        case '8':
          return 'AB>W ' + opcode.charAt(2)
        case '9':
          return 'DB>R ' + opcode.charAt(2)
        case 'A':
          return 'W>AB ' + opcode.charAt(2)
        case 'B':
          return 'R>AB ' + opcode.charAt(2)
        case 'C':
          return 'R>DB ' + opcode.charAt(2)
        case 'D':
          return 'ZROS ' + opcode.charAt(2)
        case 'F':
          switch (opcode.charAt(2)) {
            case '0':
              return 'O>DB'
            case '1':
              return 'DB>O'
            case '2':
              return 'END'
            case '3':
              return 'HLT'
            case '4':
              return 'READ'
            case '5':
              return 'WRT'
            default:
              return 'Wrong opcode'
          }
        default:
          return 'Wrong opcode'
      }
    default:
      return 'ERROR'
  }
}

module.exports = CU

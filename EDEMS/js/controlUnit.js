var global = require('./globals.js')
var CU = {}

CU.doUInstruction = function () {
  var opcode = global.microcode[global.registerUPCH.decPair]
  console.log('CU: ', opcode, CU.decode(opcode))

  global.registerUPCH.incrPair()
}

CU.decode = function (opcode) {
  if (opcode.length !== 3) {
    return 'Wrong opcode'
  }
  switch (opcode.charAt(0)) {
    case '1':
      return 'SVR'
    case '2':
      return 'SVW'
    case '3':
      return 'SETB'
    case '4':
      return 'RETB'
    case '5':
      return 'C>DB'
    case '6':
      return 'COOP'
    case '0':
      return 'ALU'
    case '8':
      return 'JMP'
    case '7':
      return '07'
    default:
      return 'ERROR'
  }
}

module.exports = CU

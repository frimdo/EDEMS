/* global sim */
var CU = {}

CU.doUInstruction = function () {
  var opcode = sim.microcode[sim.toDEC(sim.toHEX(sim.registerUPCH) + sim.toHEX(sim.registerUPCL))]
  console.log(opcode, CU.decode(opcode))

  sim.registerUPCL++
  var tmp = sim.registerUPCL
  sim.registerUPCL = sim.registerUPCL & 255
  if (tmp !== sim.registerUPCL) {
    sim.registerUPCH = (sim.registerUPCH + 1) & 7
  }
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

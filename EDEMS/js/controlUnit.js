/* global sim */
var controlUnit = {}

controlUnit.doUInstruction = function () {
  var opcode = sim.microcode[sim.toDEC(sim.toHEX(sim.registerUPCH) + sim.toHEX(sim.registerUPCL))]
  switch (opcode.charAt(0)) {
    case '0':
      console.log(opcode + ' ALU')
      break
    case '1':
      console.log(opcode + ' SVR')
      break
    case '2':
      console.log(opcode + ' SVW')
      break
    case '3':
      console.log(opcode + ' SETB')
      break
    case '4':
      console.log(opcode + ' RETB')
      break
    case '5':
      console.log(opcode + ' C>DB')
      break
    case '6':
      console.log(opcode + ' COOP')
      break
    case '8':
      console.log(opcode + ' JMP')
      break
    case '7':
      console.log(opcode + ' 07')
      break
    default:
      console.log('uInstruction decoding error at memory address ' + sim.toHEX(sim.registerUPCH) + sim.toHEX(sim.registerUPCL))
      break
  }
  sim.registerUPCL++
  var tmp = sim.registerUPCL
  sim.registerUPCL = sim.registerUPCL & 255
  if (tmp !== sim.registerUPCL) {
    sim.registerUPCH = (sim.registerUPCH + 1) & 7
  }
}

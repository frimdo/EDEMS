/* global simulator */
var controlUnit = {}

controlUnit.doUInstruction = function () {
  switch(simulator.toHEX(simulator.registerUPCH)) {
    case '00':
      console.log('ALU')
      break
    case '01':
      console.log('SVR')
      break
    case '02':
      console.log('SVW')
      break
    case '03':
      console.log('SETB')
      break
    case '04':
      console.log('RETB')
      break
    case '05':
      console.log('C>DB')
      break
    case '06':
      console.log('COOP')
      break
    case '08':
      console.log('JMP')
      break
    case '07':
      console.log('07')
      break
    default:
      console.log('uInstruction decoding error at memory address ' + simulator.toHEX(simulator.registerUPCH) + simulator.toHEX(simulator.registerUPCL))
      break
  }
}

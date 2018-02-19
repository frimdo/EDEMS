var BinNumber = require('./binNumber.js')

var global = {}

global.microcode = new Array(2048)
global.memory = new Array(65536)
global.onMemoryChange = function () { return 0}

global.instructionRegister = new BinNumber(0)

global.dataBus = new BinNumber(0)
global.addressBus = new BinNumber(0, 16)

global.registerA = new BinNumber(0)
global.registerF = new BinNumber(0, 8, global.registerA)

global.registerC = new BinNumber(0)
global.registerB = new BinNumber(0, 8, global.registerC)

global.registerE = new BinNumber(0)
global.registerD = new BinNumber(0, 8, global.registerE)

global.registerP = new BinNumber(0)
global.registerS = new BinNumber(0, 8, global.registerP)

global.registerPCL = new BinNumber(0)
global.registerPCH = new BinNumber(0, 8, global.registerPCL)

global.registerOP = new BinNumber(0)
global.registerTMP0 = new BinNumber(0, 8, global.registerOP)

global.registerTMP2 = new BinNumber(0)
global.registerTMP1 = new BinNumber(0, 8, global.registerTMP2)

global.registerUPCL = new BinNumber(0)
global.registerUPCH = new BinNumber(0, 8, global.registerUPCL, 3)

global.freq = 10

global.to1Bhex = function (num) {
  num = num.toString(16)
  if (num.length === 1) {
    num = '0' + num
    return num
  }
}

global.register = function (x) {
  switch (x) {
    case 0:
      return global.registerB
    case 1:
      return global.registerD
    case 2:
      return global.registerS
    case 3:
      return global.registerC
    case 4:
      return global.registerE
    case 5:
      return global.registerP
    case 6:
      return global.registerA
    case 7:
      return global.registerF
    case 8:
      return global.registerPCH
    case 9:
      return global.registerPCL
    case 10:
      return global.registerTMP0
    case 11:
      return global.registerTMP1
    case 12:
      return global.registerUPCH
    case 13:
      return global.registerOP
    case 14:
      return global.registerTMP2
    case 15:
      return global.registerUPCL
    default:
      throw new RangeError('There is no register with index: ' + x)

  }
}

module.exports = global

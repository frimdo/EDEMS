var BinNumber = require('./binNumber.js')

var global = {}

global.microcode = new Array(2048)
global.memory = new Array(65536)

global.dataBus = new BinNumber(0)
global.addressBus = new BinNumber(0)

global.registerA = new BinNumber(0)
global.registerF = new BinNumber(0, global.registerA)

global.registerC = new BinNumber(0)
global.registerB = new BinNumber(0, global.registerC)

global.registerE = new BinNumber(0)
global.registerD = new BinNumber(0, global.registerE)

global.registerP = new BinNumber(0)
global.registerS = new BinNumber(0, global.registerP)

global.registerPCL = new BinNumber(0)
global.registerPCH = new BinNumber(0, global.registerPCL)

global.registerOP = new BinNumber(0)
global.registerTMP0 = new BinNumber(0, global.registerOP)

global.registerTMP2 = new BinNumber(0)
global.registerTMP1 = new BinNumber(0, global.registerTMP2)

global.registerUPCL = new BinNumber(0)
global.registerUPCH = new BinNumber(0, global.registerUPCL, 3)

global.freq = 0

global.to1Bhex = function (num) {
  num = num.toString(16)
  if (num.length === 1) {
    num = '0' + num
    return num
  }
}

module.exports = global

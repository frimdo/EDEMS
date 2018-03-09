var BinNumber = require('./binNumber.js')

var global = {}

global.microcode = new Array(2048)
global.onMicrocodeChange = function () { return 0}
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
global.registerUPCH = new BinNumber(0, 3, global.registerUPCL, 3)

global.freq = 10

global.register = function (x) {
  /*
  if(typeof x =='string' && /^0$|^1$|^2$|^3$|^4$|^5$|^6$|^7$|^8$|^9$|^A$|^B$|^C$|^D$|^E$|^F$/.test(x)){
    return(x)
  }
  */ // Does not work, should 'B' mean registerB, or register #11?
  switch (x) {
    case 0:
      return global.registerF
    case 1:
      return global.registerB
    case 2:
      return global.registerD
    case 3:
      return global.registerS
    case 4:
      return global.registerA
    case 5:
      return global.registerC
    case 6:
      return global.registerE
    case 7:
      return global.registerP
    case 8:
      return global.registerPCH
    case 9:
      return global.registerTMP0
    case 10:
      return global.registerTMP1
    case 11:
      return global.registerUPCH
    case 12:
      return global.registerPCL
    case 13:
      return global.registerOP
    case 14:
      return global.registerTMP2
    case 15:
      return global.registerUPCL
    case 'F':
      return '0'
    case 'B':
      return '1'
    case 'D':
      return '2'
    case 'S':
      return '3'
    case 'A':
      return '4'
    case 'C':
      return '5'
    case 'E':
      return '6'
    case 'P':
      return '7'
    case 'PCH':
      return '8'
    case 'TMP0':
      return '9'
    case 'TMP1':
      return 'A'
    case 'UPCH':
      return 'B'
    case 'PCL':
      return 'C'
    case 'OP':
      return 'D'
    case 'TMP2':
      return 'E'
    case 'UPCL':
      return 'F'
    default:
      throw new RangeError('There is no register with name or index: ' + x)
  }
}

module.exports = global

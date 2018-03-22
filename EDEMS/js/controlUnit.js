var global = require('./globals.js')
var alu = require('./alu.js')

var CU = {}

CU.beforeUintruction = function () {}

CU.doUInstruction = function () {
  try {
    CU.beforeUintruction()
    var opcode = CU.decode(global.microcode[global.registerUPCH.decPair])
    console.log(opcode)
    switch (opcode.Name) {
      case 'SVR':
        CU.uinstr.svr(opcode.operand1, opcode.operand2)
        break
      case 'SVW':
        CU.uinstr.svw(opcode.operand1, opcode.operand2)
        break
      case 'SETB':
        CU.uinstr.setb(opcode.operand1, opcode.operand2)
        break
      case 'RETB':
        CU.uinstr.retb(opcode.operand1, opcode.operand2)
        break
      case 'JMP':
        CU.uinstr.jmp(opcode.operand1)
        break
      case 'C>DB':
        CU.uinstr.c2db(opcode.operand1)
        break
      case 'COOP':
        CU.uinstr.coop(opcode.operand1)
        break
      case 'ALU':
        CU.uinstr.alu(opcode.operand1)
        break
      case 'JOFN ':
        CU.uinstr.jofn(opcode.operand1)
        break
      case 'JOFI ':
        CU.uinstr.jofi(opcode.operand1)
        break
      case 'JON ':
        CU.uinstr.jon(opcode.operand1)
        break
      case 'JOI ':
        CU.uinstr.joi(opcode.operand1)
        break
      case 'DECW ':
        CU.uinstr.decw(opcode.operand1)
        break
      case 'INCW ':
        CU.uinstr.incw(opcode.operand1)
        break
      case 'DECB ':
        CU.uinstr.decb(opcode.operand1)
        break
      case 'INCB ':
        CU.uinstr.incb(opcode.operand1)
        break
      case 'AB>W ':
        CU.uinstr.ab2w(opcode.operand1)
        break
      case 'DB>R ':
        CU.uinstr.db2r(opcode.operand1)
        break
      case 'W>AB ':
        CU.uinstr.w2ab(opcode.operand1)
        break
      case 'R>AB ':
        CU.uinstr.r2ab(opcode.operand1)
        break
      case 'R>DB ':
        CU.uinstr.r2db(opcode.operand1)
        break
      case 'O>DB':
        CU.uinstr.o2db()
        break
      case 'DB>O':
        CU.uinstr.db2o()
        break
      case 'END':
        CU.uinstr.end()
        break
      case 'RD':
        CU.uinstr.rd()
        break
      case 'WT':
        CU.uinstr.wt()
        break
      default:
        throw new Error('CU.doUInstruction: Unknown opcode:' + opcode)
    }
  } catch (err) {
    console.log('CU:', err)
  }
  global.registerUPCH.incrPair()
}

CU.decode = function (opcode) {
  if (opcode.length !== 3) {
    throw new Error('CU.decode: wrong opcode: 0x' + opcode)
  }
  switch (opcode.charAt(0)) {
    case '1':
      return {Name: 'SVR', operand1: opcode.charAt(1), operand2: opcode.charAt(2)}
    case '2':
      return {Name: 'SVW', operand1: opcode.charAt(1), operand2: opcode.charAt(2)}
    case '3':
      return {Name: 'SETB', operand1: opcode.charAt(1), operand2: opcode.charAt(2)}
    case '4':
      return {Name: 'RETB', operand1: opcode.charAt(1), operand2: opcode.charAt(2)}
    case '5':
      return {Name: 'C>DB', operand1: opcode.substring(1, 3)}
    case '6':
      return {Name: 'COOP', operand1: opcode.substring(1, 3)}
    case '0':
      return {Name: 'ALU', operand1: opcode.substring(1, 3)}
    case '8':
      return {Name: 'JMP', operand1: (hex2num(opcode.substring(0, 3)) - 2048).toString(16)}
    case '7':
      switch (opcode.charAt(1)) {
        case '0':
          return {Name: 'JOFN ', operand1: opcode.charAt(2)}
        case '1':
          return {Name: 'JOFI ', operand1: opcode.charAt(2)}
        case '2':
          return {Name: 'JON ', operand1: opcode.charAt(2)}
        case '3':
          return {Name: 'JOI ', operand1: opcode.charAt(2)}
        case '4':
          return {Name: 'DECW ', operand1: opcode.charAt(2)}
        case '5':
          return {Name: 'INCW ', operand1: opcode.charAt(2)}
        case '6':
          return {Name: 'DECB ', operand1: opcode.charAt(2)}
        case '7':
          return {Name: 'INCB ', operand1: opcode.charAt(2)}
        case '8':
          return {Name: 'AB>W ', operand1: opcode.charAt(2)}
        case '9':
          return {Name: 'DB>R ', operand1: opcode.charAt(2)}
        case 'A':
          return {Name: 'W>AB ', operand1: opcode.charAt(2)}
        case 'B':
          return {Name: 'R>AB ', operand1: opcode.charAt(2)}
        case 'C':
          return {Name: 'R>DB ', operand1: opcode.charAt(2)}
        case 'F':
          switch (opcode.charAt(2)) {
            case '0':
              return {Name: 'O>DB'}
            case '1':
              return {Name: 'DB>O'}
            case '2':
              return {Name: 'END'}
            case '4':
              return {Name: 'RD'}
            case '5':
              return {Name: 'WT'}
            default:
              throw new Error('CU.decode: wrong opcode: 0x' + opcode)
          }
        default:
          throw new Error('CU.decode: wrong opcode: 0x' + opcode)
      }
    default:
      throw new Error('CU.decode: wrong opcode: 0x' + opcode)
  }
}

function hex2num (string) {
  return parseInt(string, 16)
}

CU.uinstr = {}
CU.uinstr.o2db = function () {
  global.dataBus.val = global.registerOP.dec
}

CU.uinstr.db2o = function () {
  global.registerOP.val = global.dataBus.dec
}

CU.uinstr.end = function () {
  global.registerPCH.incrPair()
  global.addressBus.val = global.registerPCH.decPair
  global.dataBus.val = '0x' +  global.memory[global.addressBus.dec]
  global.instructionRegister.val = global.dataBus.dec
  global.registerUPCH.valPair = global.instructionRegister.dec
  global.registerUPCH.decrPair()
}

CU.uinstr.rd = function () {
  global.dataBus.val = '0x' +  global.memory[global.addressBus.dec]
}

CU.uinstr.wt = function () {
  global.memory[global.addressBus.dec] = global.dataBus.hex
  global.onMemoryChange()
}

CU.uinstr.alu = function (operand) {
  operand = hex2num(operand)
  if(operand === 13){
    alu.doOperation(global.registerOP.dec)
    return
  }
  alu.doOperation(operand)
}

CU.uinstr.r2db = function (operand) {
  operand = hex2num(operand)
  if(operand === 13){
    global.dataBus.val = global.register(global.registerOP.dec).dec
    return
  }
  global.dataBus.val = global.register(operand).dec
}

CU.uinstr.r2ab = function (operand) {
  operand = hex2num(operand)
  if(operand === 13){
    global.addressBus.val = global.register(global.registerOP.dec).dec
    return
  }
  global.addressBus.val = global.register(operand).dec
}

CU.uinstr.w2ab = function (operand) {
  operand = hex2num(operand)
  if(operand === 13){
    global.addressBus.val = global.register(global.registerOP.dec).decPair
    return
  }
  global.addressBus.val = global.register(operand).decPair
}

CU.uinstr.db2r = function (operand) {
  operand = hex2num(operand)
  if(operand === 13){
    global.register(global.registerOP.dec).val = global.dataBus.dec
    return
  }
  global.register(operand).val = global.dataBus.dec
}

CU.uinstr.ab2w = function (operand) {
  operand = hex2num(operand)
  if(operand === 13){
    global.register(global.registerOP.dec).valPair = global.addressBus.dec
    return
  }
  global.register(operand).valPair = global.addressBus.dec
}

CU.uinstr.incb = function (operand) {
  operand = hex2num(operand)
  if(operand === 13){
    global.register(global.registerOP.dec).incr()
    return
  }
  global.register(operand).incr()
}

CU.uinstr.incw = function (operand) {
  operand = hex2num(operand)
  if(operand === 13){
    global.register(global.registerOP.dec).incrPair()
    return
  }
  global.register(operand).incrPair()
}

CU.uinstr.decb = function (operand) {
  operand = hex2num(operand)
  if(operand === 13){
    global.register(global.registerOP.dec).decr()
    return
  }
  global.register(operand).decr()
}

CU.uinstr.decw = function (operand) {
  console.log("decw: ", operand)
  operand = hex2num(operand)
  if(operand === 13){
    global.register(global.registerOP.dec).decrPair()
    return
  }
  global.register(operand).decrPair()
}

CU.uinstr.joi = function (operand) {
  operand = hex2num(operand)
  if(operand === 13){
    if (global.register(global.registerOP.dec).dec === 0) {
      global.registerUPCH.incrPair()
    }
    return
  }
  if (global.register(operand).dec === 0) {
    global.registerUPCH.incrPair()
  }
}

CU.uinstr.jon = function (operand) {
  operand = hex2num(operand)
  if(operand === 13){
    if (global.register(global.registerOP.dec).dec !== 0) {
      global.registerUPCH.incrPair()
    }
    return
  }
  if (global.register(operand).dec !== 0) {
    global.registerUPCH.incrPair()
  }
}

CU.uinstr.jofi = function (operand) {
  var leading = '0'.repeat(8 - global.registerF.bin.length)
  var F = leading + global.registerF.bin
  if(hex2num(operand) === 13) {
    if (F.charAt(global.register(global.registerOP.dec).dec) === '0') {
      global.registerUPCH.incrPair()
    }
    return
  }
  if (F.charAt(hex2num(operand)) === '0') {
    global.registerUPCH.incrPair()
  }
}

CU.uinstr.jofn = function (operand) {
  var leading = '0'.repeat(8 - global.registerF.bin.length)
  var F = leading + global.registerF.bin
  if(hex2num(operand) === 13) {
    if (F.charAt(global.register(global.registerOP.dec).dec) !== '0') {
      global.registerUPCH.incrPair()
    }
    return
  }
  if (F.charAt(hex2num(operand)) !== '0') {
    global.registerUPCH.incrPair()
  }
}

CU.uinstr.coop = function (operand) {
  global.registerOP.val = global.instructionRegister.dec - hex2num(operand)
}

CU.uinstr.c2db = function (operand) {
  global.dataBus.val = '0x' + operand
}

CU.uinstr.svr = function (operand1, operand2) {
  var tmp = global.register(hex2num(operand1)).dec
  global.register(hex2num(operand1)).val = global.register(hex2num(operand2)).dec
  global.register(hex2num(operand2)).val = tmp
}

CU.uinstr.svw = function (operand1, operand2) {
  var tmp = global.register(hex2num(operand1)).decPair
  global.register(hex2num(operand1)).valPair = global.register(hex2num(operand2)).decPair
  global.register(hex2num(operand2)).valPair = tmp
}

CU.uinstr.jmp = function (operand) {
  global.registerUPCH.valPair = hex2num(operand)
  global.registerUPCH.decrPair()
}

CU.uinstr.setb = function (operand1, operand2) {
  global.register(hex2num(operand2)).setBit(hex2num(operand1))
}

CU.uinstr.retb = function (operand1, operand2) {
  global.register(hex2num(operand2)).resBit(hex2num(operand1))
}

module.exports = CU

var global = require('./globals.js')
var alu = require('./alu.js')

var CU = {}

CU.doUInstruction = function () {
  try {
    var opcode = CU.decode(global.microcode[global.registerUPCH.decPair])
    console.log(opcode)
    switch (opcode.Name) {
      case 'SVR':
        uinstr.svr(opcode.operand1, opcode.operand2)
        break
      case 'SVW':
        uinstr.svw(opcode.operand1, opcode.operand2)
        break
      case 'SETB':
        uinstr.setb(opcode.operand1, opcode.operand2)
        break
      case 'RETB':
        uinstr.retb(opcode.operand1, opcode.operand2)
        break
      case 'JMP':
        uinstr.jmp(opcode.operand1)
        break
      case 'C>DB':
        uinstr.c2db(opcode.operand1)
        break
      case 'COOP':
        uinstr.coop(opcode.operand1)
        break
      case 'ALU':
        uinstr.alu(opcode.operand1)
        break
      case 'JOFN ':
        uinstr.jofn(opcode.operand1)
        break
      case 'JOFI ':
        uinstr.jofi(opcode.operand1)
        break
      case 'JON ':
        uinstr.jon(opcode.operand1)
        break
      case 'JOI ':
        uinstr.joi(opcode.operand1)
        break
      case 'DECW ':
        uinstr.decw(opcode.operand1)
        break
      case 'INCW ':
        uinstr.incw(opcode.operand1)
        break
      case 'DECB ':
        uinstr.decb(opcode.operand1)
        break
      case 'INCB ':
        uinstr.incb(opcode.operand1)
        break
      case 'AB>W ':
        uinstr.ab2w(opcode.operand1)
        break
      case 'DB>R ':
        uinstr.db2r(opcode.operand1)
        break
      case 'W>AB ':
        uinstr.w2ab(opcode.operand1)
        break
      case 'R>AB ':
        uinstr.r2ab(opcode.operand1)
        break
      case 'R>DB ':
        uinstr.r2db(opcode.operand1)
        break
      case 'O>DB':
        uinstr.o2db()
        break
      case 'DB>O':
        uinstr.db2o()
        break
      case 'END':
        uinstr.end()
        break
      case 'HLT':
        uinstr.hlt()
        break
      case 'READ':
        uinstr.read()
        break
      case 'WRT':
        uinstr.wrt()
        break
      default:
        throw new Error('Unknown opcode:' + opcode)
        break
    }
  } catch (err) {
    console.log('CU:', err)
  }

  global.registerUPCH.incrPair()
}

CU.decode = function (opcode) {
  if (opcode.length !== 3) {
    throw new Error('wrong opcode: 0x' + opcode)
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

function hex2num (string) {
  return parseInt(string, 16)
}

uinstr = {}
uinstr.o2db = function () {
  global.dataBus.val = global.registerOP.dec
}

uinstr.db2o = function () {
  global.registerOP.val = global.dataBus.dec
}

uinstr.end = function () {
  console.log('This Microinstruction is not implemented yet!')
  // TODO: dopsat
  // Co má udělat end?
}

uinstr.hlt = function () {
  console.log('This Microinstruction is not implemented yet!')
  // TODO: dopsat
  // Potřebujeme hlt?
}

uinstr.read = function () {
  global.dataBus.val = global.memory[global.addressBus.decPair]
}

uinstr.wrt = function () {
  global.memory[global.addressBus.decPair] = global.dataBus.dec
}

uinstr.alu = function (operand) {
  alu.doOperation(hex2num(operand))
}

uinstr.r2db = function (operand) {
  global.dataBus.val = global.register(hex2num(operand)).dec
}

uinstr.r2ab = function (operand) {
  global.addressBus.val = global.register(hex2num(operand)).dec
}

uinstr.w2ab = function (operand) {
  global.addressBus.val = global.register(hex2num(operand)).decPair
}

uinstr.db2r = function (operand) {
  global.register(hex2num(operand)).val = global.dataBus.dec
}

uinstr.ab2w = function (operand) {
  global.register(hex2num(operand)).valPair = global.addressBus.dec
}

uinstr.incb = function (operand) {
  global.register(hex2num(operand)).incr()
}

uinstr.incw = function (operand) {
  global.register(hex2num(operand)).incrPair()
}

uinstr.decb = function (operand) {
  global.register(hex2num(operand)).decr()
}

uinstr.decw = function (operand) {
  global.register(hex2num(operand)).decrPair()
}

uinstr.joi = function (operand) {
  if (global.register(hex2num(operand)).dec === 0) {
    global.registerUPCH.incrPair()
  }
}

uinstr.jon = function (operand) {
  if (global.register(hex2num(operand)).dec !== 0) {
    global.registerUPCH.incrPair()
  }
}

uinstr.jofi = function (operand) {
  var leading = '0'.repeat(8 - global.registerF.bin.length)
  var F = leading + global.registerF.bin
  if (F.charAt(hex2num(operand)) === '0') {
    global.registerUPCH.incrPair()
  }
}

uinstr.jofn = function (operand) {
  var leading = '0'.repeat(8 - global.registerF.bin.length)
  var F = leading + global.registerF.bin
  if (F.charAt(hex2num(operand)) !== '0') {
    global.registerUPCH.incrPair()
  }
}

uinstr.coop = function (operand) {
  global.registerOP.val = global.instructionRegister.dec - hex2num(operand)
}

uinstr.c2db = function (operand) {
  global.dataBus.val = '0x' + operand
}

uinstr.svr = function (operand1, operand2) {
  var tmp = global.register(hex2num(operand1)).dec
  global.register(hex2num(operand1)).val = global.register(hex2num(operand2)).dec
  global.register(hex2num(operand2)).val = tmp
}

uinstr.svw = function (operand1, operand2) {
  var tmp = global.register(hex2num(operand1)).decPair
  global.register(hex2num(operand1)).valPair = global.register(hex2num(operand2)).decPair
  global.register(hex2num(operand2)).valPair = tmp
}

uinstr.jmp = function (operand) {
  global.registerUPCH.valPair = hex2num(operand) - 1
}

uinstr.setb = function (operand1, operand2) {
  global.register(hex2num(operand2)).setBit(hex2num(operand1))
}

uinstr.retb = function (operand1, operand2) {
  global.register(hex2num(operand2)).resBit(hex2num(operand1))
}

module.exports = CU

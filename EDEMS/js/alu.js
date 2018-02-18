var global = require('./globals.js')

var ALU = {}

ALU.doOperation = function (x) {
  if (typeof val === 'number') {
    switch(x){
      case 1:
        ALU.add()
        break
      case 2:
        ALU.sub()
        break
      case 3:
        ALU.neg()
        break
      case 4:
        ALU.not()
        break
      case 5:
        ALU.and()
        break
      case 6:
        ALU.orr()
        break
      case 7:
        ALU.xor()
        break
      case 8:
        ALU.rsh()
        break
      case 9:
        ALU.lsh()
        break
      case 10:
        ALU.rro()
        break
      case 11:
        ALU.lro()
        break
      case 12:
        ALU.rrc()
        break
      case 13:
        ALU.lrc()
        break
      case 14:
        ALU.asr()
        break
      case 15:
        ALU.asl()
        break
      case 16:
        ALU.bsr()
        break
      case 17:
        ALU.bsl()
        break
      case 18:
        ALU.equ()
        break
      case 19:
        ALU.oop()
        break
      default:
        throw new RangeError('Unknown ALU operation: ' + x)
    }
  } else {

  }
}

ALU.add = function () {
  global.dataBus.val = global.registerTMP0.dec + global.dataBus.dec
}

ALU.sub = function () {
  global.dataBus.val = global.registerTMP0.dec - global.dataBus.dec
}

ALU.neg = function () {
  global.dataBus.val = -global.dataBus.dec
}

ALU.not = function () {
  global.dataBus.val = ~global.dataBus.dec
}

ALU.and = function () {
  global.dataBus.val = global.dataBus.dec & global.registerTMP0.dec
}

ALU.orr = function () {
  global.dataBus.val = global.dataBus.dec | global.registerTMP0.dec
}

ALU.xor = function () {
  global.dataBus.val = global.dataBus.dec ^ global.registerTMP0.dec
}

ALU.rsh = function () {
  global.dataBus.val = global.dataBus.dec >>> 1
}

ALU.rro = function () {
  console.log('This ALU operation is not implemented yet!')
  // TODO: dopsat
}

ALU.rrc = function () {
  console.log('This ALU operation is not implemented yet!')
  // TODO: dopsat
}

ALU.asr = function () {
  // Nefunguje, není 8b číslo. global.dataBus.val = global.dataBus.dec >> 1
}

ALU.lsh = function () {
  global.dataBus.val = global.dataBus.dec << 1
}

ALU.lro = function () {
  console.log('This ALU operation is not implemented yet!')
  // TODO: dopsat
}

ALU.lrc = function () {
  console.log('This ALU operation is not implemented yet!')
  // TODO: dopsat
}

ALU.asl = function () {
  if ((global.dataBus.dec % 2) === 0) {
    global.dataBus.val = global.dataBus.dec << 1
  } else {
    global.dataBus.val = (global.dataBus.dec << 1) + 1
  }
}

ALU.equ = function () {
  global.dataBus.val = (global.dataBus.dec === 0) ? 1 : 0
}

ALU.bsr = function () {
  console.log('This ALU operation is not implemented yet!')
  // TODO: dopsat
}

ALU.bsl = function () {
  console.log('This ALU operation is not implemented yet!')
  // TODO: dopsat
}

ALU.oop = function () {
  if(global.registerOP.dec === 19){
    throw new RangeError('Recursion caused by Register OP containing instruction to do operation defined by register OP.')
  }
  ALU.doOperation(global.registerOP.dec)
}


module.exports = ALU
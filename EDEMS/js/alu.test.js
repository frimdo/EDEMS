const ALU = require('./alu.js')
const g = require('./globals.js')

test ('add', function () {
  g.registerTMP0.val = 5
  g.dataBus.val = 5
  ALU.add()
  expect(g.dataBus.dec).toBe(10)
})

test ('sub', function () {
  g.registerTMP0.val = 10
  g.dataBus.val = 5
  ALU.sub()
  expect(g.dataBus.dec).toBe(5)
})

test ('neg', function () {
  g.dataBus.val = 85
  ALU.neg()
  expect(g.dataBus.dec).toBe(171)
})

test ('not', function () {
  g.dataBus.val = '0b10101010'
  ALU.not()
  expect(g.dataBus.bin).toBe('1010101')
})

test ('and', function () {
  g.registerTMP0.val = '0b01010101'
  g.dataBus.val = '0b11111111'
  ALU.and()
  expect(g.dataBus.bin).toBe('1010101')
})

test ('orr', function () {
  g.registerTMP0.val = '0b01010101'
  g.dataBus.val = '0b10101010'
  ALU.orr()
  expect(g.dataBus.bin).toBe('11111111')
})

test ('xor', function () {
  g.registerTMP0.val = '0b01010101'
  g.dataBus.val = '0b11111111'
  ALU.xor()
  expect(g.dataBus.bin).toBe('10101010')
})

test ('rsh', function () {
  g.dataBus.val = '0b10101010'
  ALU.rsh()
  expect(g.dataBus.bin).toBe('1010101')
})

/*test ('asr', function () {
  g.dataBus.val = '0b10101010'
  ALU.asr()
  expect(g.dataBus.bin).toBe('11010101')
})*/

test ('lsh', function () {
  g.dataBus.val = '0b10101010'
  ALU.lsh()
  expect(g.dataBus.bin).toBe('1010100')
})

test ('asl', function () {
  g.dataBus.val = '0b10101011'
  ALU.asl()
  expect(g.dataBus.bin).toBe('1010111')
})

test ('equ', function () {
  g.dataBus.val = 121
  ALU.equ()
  expect(g.dataBus.dec).toBe(0)
})

test ('equ', function () {
  g.dataBus.val = 0
  ALU.equ()
  expect(g.dataBus.dec).toBe(1)
})
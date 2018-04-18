const uComp = require('./microcodeCompiler.js')

test('compile', function () {
  var input = `ALU 0x12
DB<R 0xA
INCW 0x1`
  expect(uComp.compile(input)).toBe(['ALU', '0x12', 'DB<R', '0xA', 'INCW', '0x1'])
})
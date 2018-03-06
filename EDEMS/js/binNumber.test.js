const BinNumber = require('./binNumber.js')

test('constructor', function () {
  var x = new BinNumber(127)
  expect(x.value).toBe(127);
})

test('dec', function () {
  var x = new BinNumber(127)
  expect(x.dec).toBe(127);
})

test('decPair', function () {
  var x = new BinNumber(127)
  var y = new BinNumber(127, 8, x)
  expect(y.decPair).toBe(32639);
})
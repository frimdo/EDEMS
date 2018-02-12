const BinNumber = require('./binNumber.js')

test('constructor', () => {
  var x = new BinNumber(127)
  expect(x.value).toBe(127);
});


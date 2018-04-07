var global = require('./globals.js')
var CU = require('./controlUnit.js')

var clock = {}
clock.running = {}

clock.ustep = function () {
  clearTimeout(clock.running)
  CU.doUInstruction()
}

clock.urun = function () {
  clearTimeout(clock.running)
  clock.running = setInterval(CU.doUInstruction, (1 / global.freq) * 1000)
}

clock.step = function () {
  clearTimeout(clock.running)

  clock.running = setInterval(function () {
    if (CU.doUInstruction() === 'END') {
      clearTimeout(clock.running)
    }

  }, 1)
}

clock.stop = function () {
  clearTimeout(clock.running)
}

module.exports = clock
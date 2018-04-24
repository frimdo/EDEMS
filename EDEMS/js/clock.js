var global = require('./globals.js')
var CU = require('./controlUnit.js')

var clock = {}
clock.running = {}

/** Execute one microstep (one clock cycle) */
clock.ustep = function () {
  clearTimeout(clock.running)
  CU.doUInstruction()
}

/** Execute microsteps until stopped */
clock.urun = function () {
  clearTimeout(clock.running)
  clock.running = setInterval(CU.doUInstruction, (1 / global.freq) * 1000)
}

/** Execute microsteps until microinstruction END is executed */
clock.step = function () {
  clearTimeout(clock.running)

  clock.running = setInterval(function () {
    if (CU.doUInstruction() === 'END') {
      clearTimeout(clock.running)
    }
  }, 1)
}

/** Stop after actual microinstruction is done */
clock.stop = function () {
  clearTimeout(clock.running)
}

module.exports = clock

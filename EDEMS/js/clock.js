var global = require('./globals.js')
var CU = require('./controlUnit.js')

var clock = {}
clock.running = {}

clock.ustep = function(){
  CU.doUInstruction()
}

clock.urun = function() {
  console.log('running')
  clock.running = setInterval(CU.doUInstruction, (1/global.freq)*1000);
}

clock.stop = function() {
  console.log('stopping')
  clearTimeout(clock.running);
}

module.exports = clock
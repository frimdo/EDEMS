var $ = require('jquery')
var button = require('./button.js')
var sim = require('./simulator.js')
var gui = require('./gui.js')

$(document).ready(function () {
  sim.variableInit()
  gui.drawMicrocode()
})

/*
$(document).ready(function () {
  $('body').append(button)
})
*/
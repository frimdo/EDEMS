/* global $ */
var gui = {}

gui.drawMicrocode = function () {
  var ROM = window.localStorage.getItem('microcode').split(',')
  $('#microcode').append('<table>')
  $('#microcode').append('<caption>Micromemory</caption>')
  $('#microcode').append('<tr>')

  for (var i = 0; i < ROM.length; i++) {
    if (i % 8 === 0) {
      $('#microcode').append('</tr>').append('<tr>')
    }
    $('#microcode').append('<th>' + ROM[i] + '</th>')
  }
}

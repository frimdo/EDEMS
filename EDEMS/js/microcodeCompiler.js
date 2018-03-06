var global = require("./globals.js")

var microcodeCompiler = {}

microcodeCompiler.compile = function (input) {
  var output = []

  input = input.toUpperCase()
    .replace(/^[\s\n]+|[\s\n]+$/, '\n')
    .split('\n')
  console.log(input)
  for (var i = 0; i < input.length; i++) {
    var line = input[i].split(' ')
    switch (line[0]){
      case ('COOP'):
      case ('ALU'):
      case ('R>DB'):
        try {
          output.push('7C' + global.register(line[1]))
        } catch (err) {
          throw SyntaxError("Error on line: " + i + " " + err.message)
        }
        break
      case ('R>AB'):
        try {
          output.push('7B' + global.register(line[1]))
        } catch (err) {
          throw SyntaxError("Error on line: " + i + " " + err.message)
        }
        break
      case ('W>AB'):
      case ('DB>R'):
        try {
          output.push('79' + global.register(line[1]))
        } catch (err) {
          throw SyntaxError("Error on line: " + i + " " + err.message)
        }
        break
      case ('AB>W'):
      case ('INCB'):
        try {
          output.push('77' + global.register(line[1]))
        } catch (err) {
          throw SyntaxError("Error on line: " + i + " " + err.message)
        }
        break
      case ('DECB'):
        try {
          output.push('76' + global.register(line[1]))
        } catch (err) {
          throw SyntaxError("Error on line: " + i + " " + err.message)
        }
        break
      case ('INCW'):
      case ('DECW'):
      case ('JOI'):
        try {
          output.push('73' + global.register(line[1]))
        } catch (err) {
          throw SyntaxError("Error on line: " + i + " " + err.message)
        }
        break
      case ('JON'):
        try {
          output.push('72' + global.register(line[1]))
        } catch (err) {
          throw SyntaxError("Error on line: " + i + " " + err.message)
        }
        break
      case ('JOFI'):
        try {
          output.push('71' + global.register(line[1]))
        } catch (err) {
          throw SyntaxError("Error on line: " + i + " " + err.message)
        }
        break
      case ('JOFN'):
        try {
          output.push('70' + global.register(line[1]))
        } catch (err) {
          throw SyntaxError("Error on line: " + i + " " + err.message)
        }
        break
      case ('C>DB'):
      case ('SVR'):
        var byte = "1"
        try {
          byte += global.register(line[1])
        } catch (err) {
          throw SyntaxError("Error on line: " + i + " " + err.message)
        }
        try {
          output.push(byte += global.register(line[2]))
        } catch (err) {
          throw SyntaxError("Error on line: " + i + " " + err.message)
        }
        break
      case ('SVW'):
      case ('O>DB'):
        output.push('7F0')
        break
      case ('DB>O'):
        output.push('7F1')
        break
      case ('END'):
        output.push('7F2')
        break
      case ('JMP'):
      case ('HLT'):
        output.push('7F3')
        break
      case ('READ'):
        output.push('7F4')
        break
      case ('WRT'):
        output.push('7F5')
        break
      case ('SETB'):
        var byte = "3"
        try {
          byte += global.register(line[1])
        } catch (err) {
          throw SyntaxError("Error on line: " + i + " " + err.message)
        }
        try {
          output.push(byte += global.register(line[2]))
        } catch (err) {
          throw SyntaxError("Error on line: " + i + " " + err.message)
        }
        break
      case ('RETB'):
        var byte = "4"
        try {
          byte += global.register(line[1])
        } catch (err) {
          throw SyntaxError("Error on line: " + i + " " + err.message)
        }
        try {
          output.push(byte += global.register(line[2]))
        } catch (err) {
          throw SyntaxError("Error on line: " + i + " " + err.message)
        }
        break
      default:
        throw SyntaxError("Error on line: " + i + line[0] + ' is not a valid keyword.')
    }
  }
  return output
}

module.exports = microcodeCompiler


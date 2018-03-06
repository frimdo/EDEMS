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
      case ('R>AB'):
      case ('W>AB'):
      case ('DB>R'):
      case ('AB>W'):
      case ('INCB'):
      case ('DECB'):
      case ('INCW'):
      case ('DECW'):
      case ('JOI'):
      case ('JON'):
      case ('JOFI'):
      case ('JOFN'):
      case ('C>DB'):
      case ('SVR'):
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
      case ('RETB'):
      default:
        throw SyntaxError(input[i] + ' is not a valid keyword.')
    }
  }
  return output
}

//module.exports = microcodeCompiler

//testing area

var input = `ALU 0x12
R>DB 0xA
INCW 0x1`

console.log(microcodeCompiler.compile(input))
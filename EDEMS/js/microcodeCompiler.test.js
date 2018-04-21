const uComp = require('./microcodeCompiler.js')

test('compile', function () {
  var input = `;;;;;;;;;;;;;;;;;;;;; Jump directives
.DEF 0x61 LDF 2B
.DEF 0x61 LDB 2B
.DEF 0x61 LDD 2B
.DEF 0x61 LDS 2B
.DEF 0x61 LDA 2B
.DEF 0x61 LDC 2B
.DEF 0x61 LDE 2B
.DEF 0x61 LDP 2B

;;;;;;;;;;;;;;;;;;;;;;;;;;;;; LD
COOP 0x0
; load low address
INCW PCH
AB<W PCH
RD
DB>R TMP2
; load high address
INCW PCH
AB<W PCH
RD
DB>R TMP1
; load value to register
AB<W TMP1
RD
DB>R OP
END
`
  expect(uComp.compile(input)).toEqual(
    {listing: `         ;;;;;;;;;;;;;;;;;;;;; Jump directives
0000 861 .DEF 0x61 LDF 2B
0001 861 .DEF 0x61 LDB 2B
0002 861 .DEF 0x61 LDD 2B
0003 861 .DEF 0x61 LDS 2B
0004 861 .DEF 0x61 LDA 2B
0005 861 .DEF 0x61 LDC 2B
0006 861 .DEF 0x61 LDE 2B
0007 861 .DEF 0x61 LDP 2B
         
         ;;;;;;;;;;;;;;;;;;;;;;;;;;;;; LD
0008 600 COOP 0x0
         ; load low address
0009 758 INCW PCH
0010 7A8 AB<W PCH
0011 7F4 RD
0012 79E DB>R TMP2
         ; load high address
0013 758 INCW PCH
0014 7A8 AB<W PCH
0015 7F4 RD
0016 79A DB>R TMP1
         ; load value to register
0017 7AA AB<W TMP1
0018 7F4 RD
0019 79D DB>R OP
0020 7F2 END
         
`, output: ["861", "861", "861", "861", "861", "861", "861", "861", "600", "758", "7A8", "7F4", "79E", "758", "7A8", "7F4", "79A", "7AA", "7F4", "79D", "7F2"]
    })
})
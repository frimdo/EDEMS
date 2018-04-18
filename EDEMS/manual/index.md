# EDEMS user manual
This manual should help you using edems simulator. Note, that this simulator is in beta version, so there are some bugs expected. If you find some, please contact author using feedback button.

## Explanation image
![gui_notes](./GUI_notes.png)

### Explanation of actions
TODO

## Control Unit
### Supported uInstructions
uInstructions are 2B wide. Opcode usually is 12b with 1 4b operad, but there are some exceptions (JMP is 4b opcode with 11b operand). OP register is addressing register. When used in most microinstructions, containing value is used as address of another register instead.

O is operand, and number next to it says how many bits it takes. For example `COOP` instruction is 8bit opcode and 8bit operand.

| name             | opcode | operation description                    |
|------------------|--------|------------------------------------------|
| `COOP + O8`      | 0x6?? | **CO**unt **OP** register value. OP=IR-o1. |
| `ALU + O5`       | 0x0?? | **ALU** does operation defined by operand. For example 0x01 is ADD, 0X02 is SUB,... |
| `R>DB + O4`      | 0x7C? | move value from **R**egister defined by operand to **D**ata **B**uss. |
| `R>AB + O4`      | 0x7B? | move value from **R**egister defined by operand to 8 least significant bits of **A**ddress **B**uss, nulling 8MSB. |
| `W>AB + O4`      | 0x7A? | move **W**ord value (16b) from register pair defined by address of high register of pair defined by operand to **A**ddress **B**uss. |
| `DB>R + O4`      | 0x79? | move value from **D**ata **B**us to **R**egister. |
| `AB>W + O4`      | 0x78? | move value from **A**ddress **B**us to **W**ord pair of register defined by operand. (address of high register of pair) |
| `INCB + O4`      | 0x77? | **INC**rement **B**yte value in register defined by operand. |
| `DECB + O4`      | 0x76? | **DEC**rement **B**yte value in register defined by operand. |
| `INCW + O4`      | 0x75? | **INC**rement **W**ord value in register defined by operand. (address of high register of pair)  |
| `DECW + O4`      | 0x74? | **DEC**rement **W**ord value in register defined by operand. (address of high register of pair)  |
| `JOI + O4`       | 0x73? | **J**ump **O**ver next microinstruction if value in register defined by operand **I**s 0x00. |
| `JON + O4`       | 0x72? | **J**ump **O**ver next microinstruction if value in register defined by operand is **N**ot 0x00. |
| `JOFI + O4`      | 0x71? | **J**ump **O**ver next microinstruction if value in F[operand] **I**s 0b. uO acts as normal register for this microinstruction. |
| `JOFN + O4`      | 0x70? | **J**ump **O**ver next microinstruction if value in F[operand] is **N**ot 0b. uO acts as normal register for this microinstruction. |
| `C>DB + O8`      | 0x5?? | move operand as **C**onstant to **DB** |
| `SVR + O4 + O4`  | 0x1?? | **S**witch **V**alues in **R**egisters defined by first and second operands. |
| `SVW + O4 + O4`  | 0x2?? | **S**witch **V**alues in **W**ord register pair defined by first and second operands. (address of high register of pair) |
| `O>DB`           | 0x7F0 | move value from **O**P to **DB**. |
| `DB>O`           | 0x7F1 | move value from **DB** to **O**P. |
| `END`            | 0x7F2 | **END** of microinstruction. Signal for control unit to fetch another instruction. |
| `JMP + O11`      | 0x??? | write operand to uPC, effectively **J**u**MP**ing in microcode. opcode is 0x800 + address|
| `READ`           | 0x7F4 | **READ** from memory. |
| `WRT`            | 0x7F5 | **WR**i**T**e to memory. |
| `SETB + O4 + O4` | 0x3?? | **SET** **B**yte defined by first operand in register defined by second operand. |
| `RETB + O4 + O4` | 0X4?? |  **R**es**ET** **B**yte defined by first operand in register defined by second operand. |

### Other supported keywords
#### `.DEF`
This pseudo-microinstruction is used to define instructions. It has up to three arguments. First argument is address of first microinstruction of instruction, second argument is name of instruction and third is optional, defining how many bytes of argument the instruction takes.
#### Constants
Constants can be in:
- Binary format `0b10010`
- Hexadecimal format `0x12`
- Decimal format `18`
#### Comments
Comment sign is `;`

## Memory
### Supported pseudoinstructions
- `.org` - defines starting address to place binary to
- `.const` - place constant to memory

## Default instruction set

|keyword   | argument |cycles| operation description                    |
|----------|----------|------|------------------------------------|
|LD{reg}   | address  | 14   |**l**oa**d** from  address to register.|
|ST{reg}   | address  | 14   |**st**ore from  register to  address.|
|ADD{reg}  | address  | 17   |**add**  value from  address to  register. (result saved in the register)|
|INC{reg}  | none     | 4    |**inc**rement  register.|
|INCW{reg} | none     | 4    |**inc**rement  register pair.|
|DEC{reg}  | none     | 4    |**dec**rement  register.|
|DECW{reg} | none     | 4    |**dec**rement  register pair.|
|JMP       | address  | 12   |**j**u**mp** to address.|
|JPIF{flag}| address  | 6-15 |**j**um**p** to address **i**f flag is zero.|
|JPI{reg}  | address  | 6-15 |**j**um**p** to address **i**f register is zero.|
|SUB{reg}  | address  | 17   |**sub**tract  value from  address to  register. (result saved in the register)|
|AND{reg}  | address  | 17   |logical **and** operation of value from address and register. (result saved in the register)|
|OR{reg}   | address  | 17   |logical **or** operation of value from address and register. (result saved in the register)|
|XOR{reg}  | address  | 17   |logical **xor** operation of value from address and register. (result saved in the register)|




# EDEMS
Educational DEmonstrative Microprocessor Simulator
## EDEMS  registers
EDEMS has 14 registers, two of those are 16b, others are 8b. User reachable are 8 registers.

| #   | ------------ | #   | ------------ |
|-----|--------------|-----|--------------|
| R0  | H1           | R6  | L1           |
| R1  | H2           | R7  | L2           |
| R5  | A            | R4  | F            |
| R2  | P            | R8  | C            |
| R3  | S            | R9  | P            |
| R10 | OP1          | R11 | OP2          |
| R12 | IR           | R13 | u0           |
| R14 | uPC          | R15 | TMP          |

Light colored registers are user-addressable registers, grey are microcode-only-addressable registers.

Registers H1 and L1 can be used as 16b register HL1,
Registers H2 and L2 can be used as 16b register HL2,
Registers PC and SP are 16b and user can not address only one byte.

All registers, except PC(Program Counter) could theoretically be used as general purpose registers, but some bytes of F(flags) is rewrited after almost every ALU operation. SP is used by stack pointer instructions.

## uInstructon set
uInstructions are 1B opcode with 1 1B operand. Every functional block that can have its value (buses, registers) has its own number. They are addressable using that number. `| |` block means 1B value
- `|CuO| + |o1|` - fill u0 register with corresponding value. u0=IR-o1
- `|REG| + |o1|` - fill TMP register with value of corresponding register. TMP=R(o1)
- `|ALU| + |o1|` - ALU does operation defined by o1. o1=1=add, o1=2=or, o1=3=not
- `|2DB| + |o1|` - move value from o1 (REGISTER) to DB
- `|2AB| + |o1|` - move value from o1 (REGISTER) to AB
- `|DB2| + |o1|` - move value from DB to o1 (REGISTER)
- `|AB2| + |o1|` - move value from AB to o1 (REGISTER)
- `|INC| + |o1|` - increment value in o1 (REGISTER)
- `|DEC| + |o1|` - decrement value in o1 (REGISTER)
- `|CP1| + |o1|` - jump over next microinstruction if value in o1 (REGISTER) is 0x00.
- `|CP2| + |o1|` - jump over 2 next microinstructions if value in o1 (REGISTER) is 0x00.
- `|CP4| + |o1|` - jump over 4 next microinstructions if value in o1 (REGISTER) is 0x00.
- `|CP8| + |o1|` - jump over 8 next microinstructions if value in o1 (REGISTER) is 0x00.

## brainfuck
used registers:
- HL1 - Data pointer, initial value = `0x0010`
- SP - Output pointer, initial value = `0xFFFF`
- HL2 - Input pointer, initial value = `0x0000`
- A - Parenthesis counter, initial value = `0x00`

### Initial memory map
All of memory is filled with `0x00`

```
*********** - HL2
*         *
*         *
*********** - HL1
*         *
*         *
*         *
*         *
*         *
*         *
    ...
*         *
*         *
*********** - SP
*********** - 0x00 (constant for zeroing operation)
```
### Pseudocode for commands
#### > - 0x3E
Increment the data pointer (to point to the next cell to the right).
```
inc HL1
```
#### < - 0x3C
Decrement the data pointer (to point to the next cell to the left).
```
dec HL1
```
#### + - 0x2B
Increment (increase by one) the byte at the data pointer.
```
inc *HL1
```
#### - - 0x2D
Decrement (decrease by one) the byte at the data pointer.
```
dec *HL1
```
#### * - 0x2A
Output the byte at the data pointer.
```
*SP = *HL1
dec SP
```
#### , - 0x2C
Accept one byte of input, storing its value in the byte at the data pointer.
```
*HL1 = *HL2
inc H1L1
```
#### [ - 0x5B
If the byte at the data pointer is zero, then instead of moving the instruction pointer forward to the next command, jump it forward to the command after the matching ] command.
```
nop
// Special Character
```
#### ] - 0x5D
If the byte at the data pointer is nonzero, then instead of moving the instruction pointer forward to the next command, jump it back to the command after the matching [ command.
```
counter = 0

while True:
    pointer = pointer-1
    if string[pointer] == "]":
        counter = counter+1
    elif string[pointer] == "[" and counter != 0:
        counter = counter-1
    elif string[pointer] == "[" and counter == 0:
        pointer = pointer+1
        break
```

#### unknown
Any unknown opcode is skipped.

## minimal instruction set

Instructions use two, one ore zero operands. Microcode can operate with "microoperands" that opcodes has coded inside. For example: 
LDa16 loads 8b value from 16b address. Its definition is `|LDa16  (3b) where| + |addrH| + |addrL|`. every `| |` block means 8bit value. This means that this operation has 8b opcode and two 8b operands. The last 3 bits of opcode defines save location of load action (000b - H1, 111b - L2, 101b - A).

### instructions
- `|LD 3b where| + |addrH| + |addrL|` - load from 2B address to 8 bit register.
- `|ST 3b what| + |addrH| + |addrL|` - store from 1B register to 2B address.
- `|ADD 3b where| + |addrH| + |addrL|` - add 1B value from 2B address to 1B register.
- `|ADD 2b where| + |addrH| + |addrL|` - add 1B value from 2B address to 2B register.
- `|INC2 2b what|` - increment 2B register.
- `|INC 3b what|` - increment 1B register.
- `|DEC2 2b what|` - decrement 2B register.
- `|DEC 3b what|` - increment 1B register.
- `|TST| + |addrH| + |addrL|` - if value on 2B address is zero, next instruction is skipped.
- `|TSTF 3b which|` - if nth bit of F register is zero, next instruction is skipped.
- `|HLT|` - stop the simulator. Every unknown opcode is HLT.


## complete instruction set

### instructions
- |LDa16 3b where| + |addrH| + |addrL| - load from 16b address to 8 bit register.
- |LDa8 3b where| + |addr|
- |STa16 3b what|
- |STa8 3b what|
- |ADDa16 3b where|
- |ADDa8 3b where|
- |INC16b 2b what|
- |INC8b 3b what|
- |DEC16b 2b what|
- |DEC8b 3b what|
- |TSTa16|
- |TSTa8|
- |TSTF 3b which|

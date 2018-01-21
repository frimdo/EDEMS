#Microcode for MINIMAL instruction set

#### `|LD 3b where| + |addrH| + |addrL|` - load from 2B address to 8 bit register.

```
```

#### `|ST 3b what| + |addrH| + |addrL|` - store from 1B register to 2B address.

```
```

#### `|ADD 3b where| + |addrH| + |addrL|` - add 1B value from 2B address to 1B register. (result saved in the register)

```
//Load 1st operand
INC C
CF1 carry
INC P

2AL C
2AH P
2DB memory
DB2 OP1

//Load 2nd operand
INC C
CF1 carry
INC P

2AL C
2AH P
2DB memory
DB2 OP2

//Load value from memory
2AL OP2
2AH OP1
2DB memory
DB2 TMP

//add values
ALU +uO
DB2 uO
END
```

#### `|ADD 2b where| + |addrH| + |addrL|` - add 1B value from 2B address to 2B register. (result saved in the register)

```
```

#### `|INC2 2b what|` - increment 2B register.

```
```

#### `|INC 3b what|` - increment 1B register.

```
INC uO
END
```

#### `|DEC2 2b what|` - decrement 2B register.

```
DEC uO
CF1 carry
END
O2D 
DB2 TMP
INC TMP
INC TMP
INC TMP
INC TMP
INC TMP
INC TMP
2DB TMP
D2O
DEC uO
END
```

#### `|DEC 3b what|` - decrement 1B register.

```
DEC uO
END
```

#### `|TST| + |addrH| + |addrL|` - if value on 2B address is zero, next instruction is skipped.

```
//Load 1st operand
   INC C
   CF1 carry
   INC P
   
   2AL C
   2AH P
   2DB memory
   DB2 OP1
   
//Load 2nd operand
   INC C
   CF1 carry
   INC P
   
   2AL C
   2AH P
   2DB memory
   DB2 OP2

//Load value from memory
   2AL OP2
   2AH OP1
   2DB memory
   DB2 TMP
   CP1 TMP
   CP1 TMP
   JMP *0
   END
//Skip next instruction
*0:INC C
   CF1 carry
   INC P
   END
```

#### `|TSTF 3b which|` - if nth bit of F register is zero, next instruction is skipped.

```
```

#### `|HLT|` - stop the simulator. Every unknown opcode is HLT.

```
HLT
```


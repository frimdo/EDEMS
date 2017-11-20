# Microcode for BRAINFUCK instruction set
#### > - 0x3E
```
INC 6 (L1)
CF1 0 (carry)
INC 0 (H1)
END
```
#### < - 0x3C
```
DEC 0 (H1)
CF1 0 (carry)
DEC 6 (L1)
END
```
#### + - 0x2B
```
2AL 6 (L1)
2AH 0 (H1)
2DB 16 (Memory)
DB2 15 (TMP)
INC 15 (TMP)
2DB 15 (TMP)
DB2 16 (Memory)
END
```
#### - - 0x2D
```
2AL 6 (L1)
2AH 0 (H1)
2DB 16 (Memory)
DB2 15 (TMP)
DEC 15 (TMP)
2DB 15 (TMP)
DB2 16 (Memory)
END
```
#### * - 0x2A
```
2AL 6 (L1)
2AH 0 (H1)
2DB 16 (Memory)
2AL 9 (P)
2AH 3 (S)
DB2 16 (memory)
DEC 3 (S)
CF1 0 (carry)
DEC 9 (P)
END
```
#### , - 0x2C
```
2AL 7 (L2)
2AH 1 (H2)
2DB 16 (Memory)
2AL 6 (L1)
2AH 0 (H1)
DB2 16 (memory)
INC 6 (L1)
CF1 0 (carry)
INC 0 (H1)
END
```
#### [ - 0x5B
```
END
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
#### Unknown
```
END
```

class BinNumber {
  /* private vars:
    number value
    number maximum
    binNumber pair
  */
  constructor (val, bits = 8, paired = undefined) {
    if (typeof val === 'number') {
      this.value = val
    } else if (typeof val === 'string') {
      if (val.substring(0, 2) === '0x') {
        this.value = parseInt(val, 16)
      } else if (val.substring(0, 2) === '0b') {
        this.value = parseInt(val, 2)
      }
    }
    this.bits = bits
    this.maximum = (2 ** bits) - 1
    this.pair = paired
  }

  set val (val) {
    if (typeof val === 'number') {
      this.value = val & this.maximum
    } else if (typeof val === 'string') {
      if (val.substring(0, 2) === '0x') {
        this.val = parseInt(val.substring(2, val.length), 16)
      } else if (val.substring(0, 2) === '0b') {
        this.val = parseInt(val.substring(2, val.length), 2)
      } else {
        throw TypeError('Wrong input string')
      }
    } else {
      throw TypeError('Wrong input type')
    }
  }

  set valPair (val) {
    this.pair.val = val
    if (typeof val === 'number') {
      val = '0b' + parseInt(val, 10).toString(2)
    } else if (typeof val === 'string') {
      if (val.substring(0, 2) === '0x') {
        // TODO: Tady na tom řádku se špatně konvertuje hex na bin
        val = '0b' + parseInt(val.substring(2, val.length).toString(16), 10).toString(2)
      } else {
        throw TypeError('Wrong input string')
      }
    } else {
      throw TypeError('Wrong input type')
    }
    console.log('valPair: ' + val)
    val = val >> this.pair.bits
    console.log('valPair: ' + val)
    this.val = val
  }

  get hex () {
    var value = parseInt(this.value, 10).toString(16)
    if (value.length === 1) {
      value = '0' + value
      // TODO: Tohle by se mělo nulovat podle velikosti maxima čísla
    }
    return value
  }

  get hexPair () {
    if (this.pair === undefined) {
      throw TypeError('Instance does not have a pair.')
    }
    if (this.value === 0) {
      return this.pair.hex
    } else {
      return this.hex + this.pair.hex
    }
  }

  get bin () {
    return parseInt(this.value, 10).toString(2)
  }

  get binPair () {
    if (this.pair === undefined) {
      throw TypeError('Instance does not have a pair.')
    }
    if (this.value === 0) {
      return this.pair.bin
    } else {
      return this.bin + this.pair.bin.padStart(8, '0')
    }
    // TODO: Tohle by se mělo nulovat podle velikosti maxima čísla
  }

  get dec () {
    return this.value
  }

  get decPair () {
    if (this.pair === undefined) {
      throw TypeError('Instance does not have a pair.')
    }
    return parseInt(this.hexPair, 16)
  }

  incr () {
    this.value = (this.value + 1) & this.maximum
    return this
  }

  incrPair () {
    var tmp = this.pair.value + 1
    if (tmp !== this.pair.incr().value) {
      tmp = this.value + 1
      if (tmp !== this.incr().value) {
        this.pair.val = 0
      }
    }
    return this
  }

  decr () {
    this.value = (this.value - 1) & this.maximum
    return this
  }

  decrPair () {
    if (this.pair.value === 0 && this.value === 0) {
      this.pair.value = this.pair.maximum
      this.value = this.maximum
      return this
    }
    this.valPair = this.decPair - 1
    return this
  }

  setBit (num) {
    if (2 ** (num + 1) > this.maximum) {
      throw new RangeError('Argument num too big.')
    }
    this.value |= 1 << num
    return this
  }

  resBit (num) {
    if (2 ** (num + 1) > this.maximum) {
      throw new RangeError('argument num too big')
    }
    this.value &= ~(1 << num)
    return this
  }

  togBit (num) {
    if (2 ** (num + 1) > this.maximum) {
      throw new RangeError('argument num too big')
    }
    this.value ^= 1 << num
    return this
  }
}

module.exports = BinNumber

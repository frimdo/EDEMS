class BinNumber {
  /* private vars:
    number value
    number maximum
    binNumber pair
  */
  constructor (val, bits = 8, paired = undefined) {
    this.bits = bits
    this.maximum = (2 ** bits) - 1
    this.pair = paired
    if (typeof val === 'number') {
      this.val = val
    } else if (typeof val === 'string') {
      if (val.substring(0, 2) === '0x') {
        this.val = parseInt(val, 16)
      } else if (val.substring(0, 2) === '0b') {
        this.val = parseInt(val, 2)
      }
    }
  }

  set val (val) {
    if (typeof val === 'number') {
      this.value = val & this.maximum
      return
    }
    if (typeof val === 'string' && val.substring(0, 2) === '0x') {
      this.val = parseInt(val.substring(2, val.length), 16) & this.maximum
      return
    }
    if (typeof val === 'string' && val.substring(0, 2) === '0b') {
      this.val = parseInt(val.substring(2, val.length), 2) & this.maximum
      return
    }
    throw TypeError('Wrong input')
  }

  set valPair (val) {
    this.pair.val = val

    if (typeof val === 'string' && val.substring(0, 2) === '0b') {
      val = val.substring(0, val.length - this.pair.bits)
    }
    if (typeof val === 'string' && val.substring(0, 2) === '0x') {
      val = parseInt(val, 16)
    }
    if (typeof val === 'number') {
      val = val.toString(2)
      val = '0b' + val.substring(0, val.length - this.pair.bits)
    }
    try {
      this.val = val
    } catch (err) {
      this.val = 0
    }
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

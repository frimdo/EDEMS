/** New type allowing to create a n-bit int variable */
class BinNumber {
  /** @constructor
   * @param {number} default value
   * @param {number} number of bits
   * @param {BinNumber} Paired BinNumber (constructedNumber paired)
   */
  constructor (val, bits = 8, paired = undefined) {
    this.bits = bits
    this.maximum = (Math.pow(2, bits)) - 1
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

  /** Value setter
   * @param {number/string} value that will be truncated. Accepts number or hex and binary strings (0x7F, 0b1010)
   */
  set val (val) {
    if (typeof val === 'number') {
      this.value = val & this.maximum
      this.onChange()
      return
    }
    if (typeof val === 'string' && val.substring(0, 2) === '0x') {
      this.val = parseInt(val.substring(2, val.length), 16) & this.maximum
      this.onChange()
      return
    }
    if (typeof val === 'string' && val.substring(0, 2) === '0b') {
      this.val = parseInt(val.substring(2, val.length), 2) & this.maximum
      this.onChange()
      return
    }
    throw new TypeError('BinNumber - val: Wrong input')
  }

  /** Value setter for whole pair
   * @param {number/string} value that will be truncated. Accepts number or hex and binary strings (0x7F, 0b1010)
   */
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
    this.onChange()
  }

  /** Value getter in hex format (0x7F) */
  get hex () {
    var value = parseInt(this.value, 10).toString(16)

    if (this.bits <= 8) {
      return '0'.repeat(2 - value.length) + value
    } else if (this.bits <= 16) {
      return '0'.repeat(4 - value.length) + value
    } else {
      return value
    }
  }

  /** Value getter in hex format (0x7F) for whole pair */
  get hexPair () {
    if (this.pair === undefined) {
      throw new TypeError('BinNumber - hexPair: Instance does not have a pair.')
    }
    if (this.value === 0) {
      return this.pair.hex
    } else {
      return this.hex + this.pair.hex
    }
  }

  /** Value getter in bin format (0b10110) */
  get bin () {
    var value = parseInt(this.value, 10).toString(2)
    return '0'.repeat(this.bits - value.length) + value
  }

  /** Value getter in bin format (0b10110) for whole pair */
  get binPair () {
    if (this.pair === undefined) {
      throw new TypeError('BinNumber - binPair: Instance does not have a pair.')
    }
    if (this.value === 0) {
      return this.pair.bin
    } else {
      return this.bin + this.pair.bin.padStart(8, '0')
    }
  }

  /** Value getter in numbern format (123) */
  get dec () {
    return this.value
  }

  /** Value getter in numbern format (123) for whole pair */
  get decPair () {
    if (this.pair === undefined) {
      throw new TypeError('BinNumber - decPair: Instance does not have a pair.')
    }
    return parseInt(this.hexPair, 16)
  }

  /** Method to increment value */
  incr () {
    this.value = (this.value + 1) & this.maximum
    this.onChange()
    return this
  }

  /** Method to increment value of whole pair */
  incrPair () {
    var tmp = this.pair.value + 1
    if (tmp !== this.pair.incr().value) {
      tmp = this.value + 1
      if (tmp !== this.incr().value) {
        this.pair.val = 0
      }
    }
    this.onChange()
    return this
  }

  /** Method to decrement value */
  decr () {
    this.value = (this.value - 1) & this.maximum
    this.onChange()
    return this
  }

  /** Method to decrement value of whole pair */
  decrPair () {
    if (this.pair.value === 0 && this.value === 0) {
      this.pair.val = this.pair.maximum
      this.val = this.maximum
      return this
    }
    this.valPair = this.decPair - 1
    return this
  }

  /** Method to set certain bit of number
   * @param {number} number of bit. LSB = 0
   */
  setBit (num) {
    if (Math.pow(2, (num + 1)) > this.maximum) {
      throw new RangeError('BinNumber - setBit: Argument num too big.')
    }
    this.value |= 1 << num
    this.onChange()
    return this
  }

  /** Method to reset certain bit of number
   * @param {number} number of bit. LSB = 0
   */
  resBit (num) {
    if (Math.pow(2, (num + 1)) > this.maximum) {
      throw new RangeError('BinNumber - resBit: argument num too big')
    }
    this.value &= ~(1 << num)
    this.onChange()
    return this
  }

  /** Function, that is called on change of value */
  onChange () {
    return 0
  }
}

module.exports = BinNumber

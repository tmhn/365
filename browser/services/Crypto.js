'use strict'

import { createDecipher, createCipher } from 'browserify-cipher'

class CryptoService {

  constructor (algorithm) {
    this.algorithm = algorithm || 'aes-256-ctr'
    this.password = window.localStorage.password
  }

  encrypt (text) {
    let cipher = createCipher(this.algorithm, this.password)
    let crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex')
    return crypted
  }

  decrypt (text) {
    let decipher = createDecipher(this.algorithm, this.password)
    let dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8')
    return dec
  }

}

export default new CryptoService()

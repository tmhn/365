'use strict'

import request from 'superagent'
import decode from 'jwt-decode'
import { browserHistory } from 'react-router'

class AuthService {

  login (email, password, callback) {
    request.post('/auth')
      .send({ email, password })
      .end((err, res) => {
        if (err) return callback(err, false)
        window.localStorage.token = res.body.token
        window.localStorage.password = password
        callback(null, true)
      })
  }

  logout () {
    window.localStorage.removeItem('token')
    browserHistory.push('/')
  }

  getAuthToken () {
    return window.localStorage.token
  }

  isAuthed () {
    let token = window.localStorage.token
    let expired

    if (token) {
      expired = Math.floor(Date.now() / 1000) >= decode(token).exp
    }

    return (!!token) && !expired
  }

}

export default new AuthService()

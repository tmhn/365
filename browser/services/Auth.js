'use strict'

import request from 'superagent'

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
  }

  getAuthToken () {
    return window.localStorage.token
  }

  isAuthed () {
    return !!window.localStorage.token
  }

}

export default new AuthService()

import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import ReactMixin from 'react-mixin'
import LinkedStateMixin from 'react-addons-linked-state-mixin'
import request from 'superagent'
import cx from 'classnames'

class NewUserForm extends Component {

  constructor (props) {
    super(props)

    this.state = {
      email: '',
      confirmEmail: '',
      password: '',
      confirmPassword: ''
    }

    this._handleSubmit = this._handleSubmit.bind(this)
  }

  _handleSubmit (e) {
    e.preventDefault()

    request.post('/api/user')
      .send({ email: this.state.email, password: this.state.password })
      .end((err, res) => {
        if (err) return console.log(err)

        browserHistory.push('/')
      })
  }

  render () {
    let passwordsInvalid = (this.state.password && this.state.confirmPassword) && (this.state.password !== this.state.confirmPassword)
    let emailsInvalid = (this.state.email && this.state.confirmEmail) && (this.state.email !== this.state.confirmEmail)
    let emailValidClasses = cx({ 'has-error': emailsInvalid })
    let passwordValidClasses = cx({ 'has-error': passwordsInvalid })

    return (
      <div className='container'>
        <header className='row'>
          <h1 className='logo'>365</h1>
        </header>

        <section className='row'>
          <form>
            <div className='form-group'>
              <input className={emailValidClasses} type='email' placeholder='email' valueLink={this.linkState('email')}/>
            </div>
            <div className='form-group'>
              <input className={emailValidClasses} type='email' placeholder='confirm email' valueLink={this.linkState('confirmEmail')}/>
              {emailsInvalid ? <p className='error'>Emails must match.</p> : ''}
            </div>
            <div className='form-group'>
              <input className={passwordValidClasses} type='password' placeholder='password' valueLink={this.linkState('password')}/>
            </div>
            <div className='form-group'>
              <input className={passwordValidClasses} type='password' placeholder='confirm password' valueLink={this.linkState('confirmPassword')}/>
              {passwordsInvalid ? <p className='error'>Passwords must match.</p> : ''}
            </div>

            <div className='btn-group'>
              <button className='btn' onClick={this._handleSubmit}>Submit</button>
            </div>
          </form>
        </section>
      </div>
    )
  }
}

ReactMixin(NewUserForm.prototype, LinkedStateMixin)

export default NewUserForm

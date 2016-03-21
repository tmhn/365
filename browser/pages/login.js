import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import ReactMixin from 'react-mixin'
import LinkedStateMixin from 'react-addons-linked-state-mixin'
import AuthService from '../services/Auth'

class App extends Component {

  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }

    this._handleLoginClick = this._handleLoginClick.bind(this)
  }

  _handleLoginClick (e) {
    e.preventDefault()

    AuthService.login(this.state.email, this.state.password, (err, loggedIn) => {
      if (err) console.log(err)

      if (loggedIn) {
        browserHistory.push('/new')
      }
    })
  }

  render () {
    return (
      <div className='container'>
        <header className='row'>
          <h1 className='logo'>365</h1>
        </header>

        <section className='row'>
          <form>
            <div className='form-group'>
              <input type='email' placeholder='email' valueLink={this.linkState('email')}/>
            </div>
            <div className='form-group'>
              <input type='password' placeholder='password' valueLink={this.linkState('password')}/>
            </div>

            <div className='btn-group'>
              <button className='btn' onClick={this._handleLoginClick}>Sign In</button>
              <br /><br />
              <Link to='/signup'>Sign Up</Link>
            </div>
          </form>
        </section>
      </div>
    )
  }
}

ReactMixin(App.prototype, LinkedStateMixin)

export default App

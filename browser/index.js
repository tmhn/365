import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route } from 'react-router'
import AuthService from './services/Auth'
import App from './pages/login'
import NewMemoryForm from './pages/memory-form'
import NewUserForm from './pages/user-form'

import './css/main.css'

function requireAuth (nextState, replace) {
  if (!AuthService.isAuthed()) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

render((
  <Router history={browserHistory}>
    <Route path='/' component={App} />
    <Route path='/signup' component={NewUserForm} />
    <Route path='/new' component={NewMemoryForm} onEnter={requireAuth} />
  </Router>
), document.getElementById('app'))

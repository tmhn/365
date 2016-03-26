import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route } from 'react-router'
import AuthService from './services/Auth'
import App from './pages/login'
import NewMemoryForm from './pages/memory-form'
import NewUserForm from './pages/user-form'
import YearView from './pages/year'

import './css/main.css'

function requireAuth (nextState, replace) {
  if (!AuthService.isAuthed()) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

function checkYearIsInPast (nextState, replace) {
  // let year = parseInt(nextState.params.year)
  // let currentYear = new Date().getFullYear()

  // if (year >= currentYear) {
  //   replace({
  //     pathname: '/',
  //     state: { nextPathname: nextState.location.pathname }
  //   })
  // }
}

render((
  <Router history={browserHistory}>
    <Route path='/' component={App} />
    <Route path='/signup' component={NewUserForm} />
    <Route path='/new' component={NewMemoryForm} onEnter={requireAuth} />
    <Route path='/year/:year' component={YearView} onEnter={checkYearIsInPast} />
  </Router>
), document.getElementById('app'))

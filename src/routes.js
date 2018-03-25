import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App/index'
import Home from './components/Home/index'
import Login from './components/Login/index'
import Signup from './components/Signup/index'
import Profile from './components/Profile/index'
import Learning from './components/Learning/index'
import NotFound from './components/NotFound/index'

export const routes = (
  <div>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='login' component={Login} />
      <Route path='signup' component={Signup} />
      <Route path='profile' component={Profile} />
      <Route path='learning/:video_id' component={Learning} />
    </Route>
    <Route path='*' component={NotFound} />
  </div>
)

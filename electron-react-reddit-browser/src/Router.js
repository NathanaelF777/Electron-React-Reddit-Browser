import React from 'react'
import {HashRouter, Route, Switch} from 'react-router-dom'
import App from './App'
import Image from './components/Image'


const Router = () => (
  <HashRouter>
    <Switch>
      <Route exact path='/' component={App} />
      <Route exact path='/show' component={Image} />

    </Switch>
  </HashRouter>
)

export default Router

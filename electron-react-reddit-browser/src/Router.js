import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import App from './App'
import Image from './components/Image'


const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={App} />
      <Route exact path='/show' component={Image} />

    </Switch>
  </BrowserRouter>
)

export default Router

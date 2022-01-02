import React from 'react'
import { Router, Switch, Route} from 'react-router-dom'
import Login from '../Login'
import Layout from '../Layout'
import UnLoginLayout from '../Layout/UnLogin'
import Chat from '../Chat'
import Demo from '../Demo'
import Register from '../Register'
import { myHistory } from 'src/utils'
const ChatComponent = Layout(Chat)
const LoginPage = UnLoginLayout(Login)
const RegisterPage = UnLoginLayout(Register)
export default function RouterIndex() {
  return <Router history={myHistory} >
    <Switch>
      <Route exact path='/' component={LoginPage} />
      <Route path='/register' component={RegisterPage} />
      <Route path='/chat' component={ChatComponent} />
      <Route path='/demo' component={Demo} />
    </Switch>
  </Router>
}
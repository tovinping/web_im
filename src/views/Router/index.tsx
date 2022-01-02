import React from 'react'
import { Router, Switch, Route} from 'react-router-dom'
import Login from '../Login'
import Layout from '../Layout'
import Chat from '../Chat'
import Demo from '../Demo'
import Register from '../Register'
import { myHistory } from 'src/utils'
const ChatComponent = Layout(Chat)
export default function RouterIndex() {
  return <Router history={myHistory} >
    <Switch>
      <Route exact path='/' component={Login} />
      <Route path='/register' component={Register} />
      <Route path='/chat' component={ChatComponent} />
      <Route path='/demo' component={Demo} />
    </Switch>
  </Router>
}
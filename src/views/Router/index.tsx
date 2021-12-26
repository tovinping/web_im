import React from 'react'
import { HashRouter, Switch, Route} from 'react-router-dom'
import Login from '../Login'
import Layout from '../Layout'
import Chat from '../Chat'
import Demo from '../Demo'
const ChatComponent = Layout(Chat)
export default function Router() {
  return <HashRouter>
    <Switch>
      <Route exact path='/' component={Login} />
      <Route path='/chat' component={ChatComponent} />
      <Route path='/demo' component={Demo} />
    </Switch>
  </HashRouter>
}
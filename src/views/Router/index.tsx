import React from 'react'
import { Router, Switch, Route} from 'react-router-dom'
import Layout from '../Layout'
import UnLoginLayout from '../Layout/UnLogin'
import Login from '../Login'
import Chat from '../Chat'
import Demo from '../Demo'
import Register from '../Register'
import Forget from '../Forget'
import { myHistory } from 'src/utils'
const ChatComponent = Layout(Chat)
const LoginPage = UnLoginLayout({content: Login, title: '帐号登录'})
const RegisterPage = UnLoginLayout({content: Register, title: '欢迎注册'})
const ForgetPage = UnLoginLayout({content: Forget, title: '忘记密码'})
export default function RouterIndex() {
  return <Router history={myHistory} >
    <Switch>
      <Route exact path='/' component={LoginPage} />
      <Route path='/register' component={RegisterPage} />
      <Route path='/forget' component={ForgetPage} />
      <Route path='/chat' component={ChatComponent} />
      <Route path='/demo' component={Demo} />
    </Switch>
  </Router>
}
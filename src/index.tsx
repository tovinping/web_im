import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import 'src/utils/logger'
import Router from './views/Router'
import store from './store'
import reportWebVitals from './reportWebVitals'
import './index.css'
import { initialDb } from './utils/indexDB'
initialDb('456')
ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('root')
)

// If you want to star t measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

import React, { useState, useEffect, useCallback } from 'react'
import { Button, Input, message, Spin } from 'antd'
import { useHistory } from 'react-router'
import { doAutoLogin, doLogin } from 'src/utils'
import style from './index.module.scss'

export default function Login() {
  const history = useHistory()
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const autoLogin = useCallback(async () => {
    const result = await doAutoLogin()
    setLoading(false)
    if (result === '0') {
      window.$dispatch({ type: 'updateGlobal', payload: { isLogin: true, account } })
      history.replace('/chat')
    } else if (result === '1') {
      message.error('密码已过期,请重新登录', 1)
    }
  }, [account, history])
  useEffect(() => {
    if (!window.isAutoLogin) {
      window.isAutoLogin = true
      setLoading(true)
      autoLogin()
    }
  }, [autoLogin])
  async function handDoLogin() {
    if (!account.trim() || !password.trim()) return
    setLoading(true)
    const result = await doLogin({ account, password })
    setLoading(false)
    if (result) {
      window.$dispatch({ type: 'updateGlobal', payload: { isLogin: true, account } })
      history.replace('/chat')
    } else {
      message.error('登录失败', 1)
    }
  }
  return (
    <Spin spinning={loading} tip={'登录中...'} wrapperClassName={style.spinWrap}>
      <div className={style.loginContainer}>
        <h1 className={style.title}>帐号登录</h1>
        <h2 className={style.subTitle}>Development zone</h2>
        <div className={style.inputPanel}>
          <h1>用户登录</h1>
          <div className={style.account}>
            <div>用户名</div>
            <div className={style.input}>
              <Input placeholder={'请输入用户名'} onChange={evt => setAccount(evt.target.value)} />
            </div>
          </div>
          <div className={style.password}>
            <div>密&nbsp;&nbsp;&nbsp;&nbsp;码</div>
            <div className={style.input}>
              <Input placeholder={'请输入密码'} type={'password'} onChange={evt => setPassword(evt.target.value)} />
            </div>
          </div>
          <div className={style.loginBtn}>
            <Button type="primary" block size="large" onClick={handDoLogin}>
              登录
            </Button>
          </div>
        </div>
      </div>
    </Spin>
  )
}

import React, { useState, useEffect, useCallback } from 'react'
import { Button, Input, Spin } from 'antd'
import { doAutoLogin, doLogin, myHistory } from 'src/utils'
import style from './index.module.scss'

export default function Login() {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const autoLogin = useCallback(async () => {
    await doAutoLogin()
    setLoading(false)
  }, [])
  useEffect(() => {
    setLoading(true)
    autoLogin()
  }, [autoLogin])
  const handDoLogin = async() => {
    if (!account.trim() || !password.trim()) return
    setLoading(true)
    await doLogin({ account, password })
    setLoading(false)
  }
  const goRegister = () => {
    myHistory.push('/register')
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
          <div className={style.other}>
            <Button type="link" onClick={goRegister}>注册帐号</Button>
            <Button type="link">忘记密码</Button>
          </div>
        </div>
      </div>
    </Spin>
  )
}

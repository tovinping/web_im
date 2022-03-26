import React, { useState, useEffect, useCallback } from 'react'
import { Button, Input, Spin } from 'antd'
import { doAutoLogin, doLogin, myHistory } from 'src/utils'
import style from './index.module.scss'
import { getLoginCaptcha } from 'src/api/server'

export default function Login() {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [captchaText, setCaptchaText] = useState('')
  const [captcha, setCaptcha] = useState({ id: '', svg: '' })
  const getCaptcha = useCallback(async () => {
    const { body } = await getLoginCaptcha()
    if (body?.svg) {
      setCaptcha({ ...body })
    } else {
      setCaptcha({ id: '-1', svg: '' })
    }
  }, [])
  const autoLogin = useCallback(async () => {
    const result = await doAutoLogin()
    setLoading(false)
    if (result !== 0) {
      getCaptcha()
    } else {
      myHistory.replace('/chat')
    }
  }, [getCaptcha])
  useEffect(() => {
    setLoading(true)
    autoLogin()
  }, [autoLogin])
  const handDoLogin = async () => {
    if (!account.trim() || !password.trim()) return
    setLoading(true)
    const result = await doLogin({ account, password, captchaId: captcha.id, captchaText: captchaText.toLocaleLowerCase() })
    setLoading(false)
    if (result === 0) {
      myHistory.replace('/chat')
    }
  }
  return (
    <Spin spinning={loading} tip={'登录中...'} wrapperClassName={style.spinWrap}>
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
        <div className={style.captcha}>
          <div>验证码</div>
          <Input placeholder={'请输验证码'} onChange={evt => setCaptchaText(evt.target.value)} />
          {captcha.svg ? (
            <div className={style.svg} onClick={getCaptcha} dangerouslySetInnerHTML={{ __html: captcha.svg }}></div>
          ) : (
            <div className={style.captchaEmpty} onClick={getCaptcha}>
              {captcha.id === '-1' ? '点击重试' : ''}
            </div>
          )}
        </div>
        <div className={style.loginBtn}>
          <Button type="primary" block size="large" onClick={handDoLogin}>
            登录
          </Button>
        </div>
        <div className={style.other}>
          <Button type="link" onClick={() => myHistory.push('/register')}>
            注册帐号
          </Button>
          <Button type="link" onClick={() => myHistory.push('/forgot')}>
            忘记密码
          </Button>
        </div>
      </div>
    </Spin>
  )
}

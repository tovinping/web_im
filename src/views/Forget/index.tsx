import React from 'react'
import { Form, Input, Button } from 'antd'
import style from './index.module.scss'
import { handForget, myHistory } from 'src/utils'

export default function ForgetPassword() {
  const goBack = () => {
    myHistory.goBack()
  }
  const onFinish = (values: any) => {
    console.log(values)
    handForget(values)
  }
  return (
    <div className={style.forget}>
      <Form requiredMark={false} labelCol={{ span: 8 }} wrapperCol={{ span: 20 }} onFinish={onFinish} autoComplete="off">
        <Form.Item label="帐号" name="account"  colon={false} rules={[{ required: true, message: '帐号不能为空' }]}>
          <Input placeholder='请输入帐号'/>
        </Form.Item>
        <Form.Item
          label="邮箱"
          name="mail"
          colon={false}
          rules={[
            { required: true, message: '邮箱不能为空' },
            { type: 'email', message: '邮箱格式不准确' },
          ]}
        >
          <Input placeholder='输入邮箱用于接收验证码' />
        </Form.Item>
        <Form.Item label="新密码" name="password" colon={false} rules={[{ required: true, message: '密码不能为空' }]}>
          <Input.Password placeholder='输入新密码，别再忘记啦' />
        </Form.Item>
        <Form.Item label="验证码" colon={false}>
          <div className={style.captcha}>
            <Form.Item
              name="captcha"
              noStyle
              rules={[{ required: true, message: '验证码不能为空' }]}
            >
              <Input placeholder='请输入验证码' />
            </Form.Item>
            <Button type={'link'}>获取验证码</Button>
          </div>
        </Form.Item>

        <div className={style.submit}>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
          <Button onClick={goBack}>返回</Button>
        </div>
      </Form>
    </div>
  )
}

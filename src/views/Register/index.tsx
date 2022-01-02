import React from 'react'
import { Form, Input, Button } from 'antd'
import style from './index.module.scss'
import { handRegister, myHistory } from 'src/utils'
export default function Register() {
  const onFinish = (values: any) => {
    delete values.rePassword
    handRegister(values)
  }
  const goBack = () => {
    myHistory.goBack();
  }
  return (
    <div className={style.register}>
      <h1>欢迎注册</h1>
      <div className={style.form}>
        <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 20 }} onFinish={onFinish} autoComplete="off">
          <Form.Item label="帐号" name="account" rules={[{ required: true, message: '帐号不能为空' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="昵称" name="name" rules={[{ required: true, message: '昵称不能为空' }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="邮箱"
            name="mail"
            rules={[
              { required: true, message: '邮箱不能为空' },
              { type: 'email', message: '邮箱格式不准确' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="密码" name="password" rules={[{ required: true, message: '密码不能为空' }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="确认密码"
            name="rePassword"
            rules={[
              {
                required: true,
                message: '密码不能为空',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('两次密码需一致'))
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <div className={style.submit}>
            <Button type="primary" htmlType="submit">
              注册
            </Button>
            <Button onClick={goBack}>返回</Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

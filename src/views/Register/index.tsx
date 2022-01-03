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
    myHistory.goBack()
  }
  return (
    <div className={style.register}>
      <Form labelCol={{ span: 7 }} requiredMark={false} wrapperCol={{ span: 18 }} onFinish={onFinish} autoComplete="off">
        <Form.Item label="帐号" name="account" colon={false} rules={[{ required: true, message: '帐号不能为空' }]}>
          <Input placeholder='请输入帐号'/>
        </Form.Item>

        <Form.Item label="昵称" name="name" colon={false} rules={[{ required: true, message: '昵称不能为空' }]}>
          <Input placeholder='请输入昵称' />
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
          <Input placeholder='请输入邮箱' />
        </Form.Item>

        <Form.Item label="密码" name="password" colon={false} rules={[{ required: true, message: '密码不能为空' }]}>
          <Input.Password placeholder='密码必需的' />
        </Form.Item>

        <Form.Item
          label="确认密码"
          name="rePassword"
          colon={false}
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
          <Input.Password placeholder='确认输入密码' />
        </Form.Item>

        <div className={style.submit}>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
          <Button onClick={goBack}>返回</Button>
        </div>
      </Form>
    </div>
  )
}

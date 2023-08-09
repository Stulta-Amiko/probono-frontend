import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd'

const AuthIn = () => (
  <div>
    <Form.Item
      name='email'
      label='이메일'
      rules={[
        {
          type: 'email',
          message: '유효하지 않은 이메일입니다.',
        },
        {
          required: true,
          message: '이메일 계정을 넣어주세요',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label='비밀번호'
      name='password'
      rules={[
        {
          required: true,
          message: '비밀번호를 넣어주세요',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      name='remember'
      valuePropName='checked'
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type='primary' htmlType='submit'>
        로그인
      </Button>
    </Form.Item>
  </div>
)

export default AuthIn

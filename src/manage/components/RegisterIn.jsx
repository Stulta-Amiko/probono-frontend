import React, { useState, useEffect } from 'react'
import { Button, Form, Input } from 'antd'

import { useHttpClient } from '../../shared/hooks/http-hook'
import Region from './Region'

const RegisterIn = () => {
  const [region, setRegion] = useState(null)

  const [loadedRegions, setLoadedRegions] = useState()

  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_ADDRESS + '/region'
        )
        console.log(responseData.regions)
        setLoadedRegions(responseData.regions)
      } catch (err) {}
    }
    fetchRegions()
  }, [sendRequest])

  const setRegionHandler = (value) => {
    console.log(value)
    setRegion(value)
  }
  return (
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
        label='이름'
        name='name'
        rules={[
          {
            required: true,
            message: '이름을 입력해주세요.',
          },
          { min: 2, message: '이름은 2자 이상이어야 합니다.' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='password'
        label='비밀번호'
        rules={[
          { required: true, message: '비밀번호를 입력해주세요.' },
          { min: 8, message: '비밀번호는 8자 이상이어야 합니다.' },
          { max: 16, message: '비밀번호는 16자 이하여야 합니다.' },
          {
            pattern:
              /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
            message:
              '비밀번호는 영어, 숫자, 특수문자가 모두 포함되어야 합니다.',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name='confirm'
        label='비밀번호 확인'
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: '비밀번호를 입력해주세요.',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('비밀번호가 일치하지 않습니다.'))
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name='region'
        label='지역명'
        rules={[
          {
            required: true,
            message: '지역을 선택해주세요.',
          },
        ]}
      >
        {console.log(loadedRegions)}
        {!isLoading && loadedRegions && (
          <Region items={loadedRegions} onChange={setRegionHandler} />
        )}
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type='primary' htmlType='submit'>
          가입하기
        </Button>
      </Form.Item>
    </div>
  )
}

export default RegisterIn

import React, { useState, useEffect } from 'react'
import { Button, Form, Input, InputNumber } from 'antd'

import { useHttpClient } from '../../shared/hooks/http-hook'
import Region from '../../manage/components/Region'

const RegisterUser = () => {
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
        label='주소'
        name='address'
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
        label='생일'
        name='birthdate'
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
        label='전화번호'
        name='phoneNumber'
        rules={[
          {
            required: true,
            message: '전화번호를 입력해주세요.',
          },
        ]}
      >
        <InputNumber
          rules={[{ type: 'number', message: '숫자만 입력해주세요.' }]}
        />
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
    </div>
  )
}

export default RegisterUser

import React from 'react'
import { Select, Form } from 'antd'

const Option = Select

const Authority = (props) => {
  return (
    <div>
      <Form.Item
        name='user_name'
        label='관리자 이름'
        rules={[
          {
            required: true,
            message: '관리자를 선택해 주세요.',
          },
        ]}
      >
        <Select placeholder='이름' onChange={props.onChange} allowClear>
          <Option value={true}>설정</Option>
          <Option value={false}>해제</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name='is_super'
        label='최고 권한'
        rules={[
          {
            required: true,
            message: '권한을 선택해주세요.',
          },
        ]}
      >
        <Select placeholder='최고 권한' onChange={props.onChange} allowClear>
          <Option value={true}>설정</Option>
          <Option value={false}>해제</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name='is_admin'
        label='일반 관리자 권한'
        rules={[
          {
            required: true,
            message: '권한을 선택해주세요.',
          },
        ]}
      >
        <Select
          placeholder='일반 관리자 권한'
          onChange={props.onChange}
          allowClear
        >
          <Option value={true}>설정</Option>
          <Option value={false}>해제</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name='is_user'
        label='읽기 전용 권한'
        rules={[
          {
            required: true,
            message: '권한을 선택해주세요.',
          },
        ]}
      >
        <Select
          placeholder='읽기 전용 권한'
          onChange={props.onChange}
          allowClear
        >
          <Option value={true}>설정</Option>
          <Option value={false}>해제</Option>
        </Select>
      </Form.Item>
    </div>
  )
}

export default Authority

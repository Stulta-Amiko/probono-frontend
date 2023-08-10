import React from 'react'
import { Select } from 'antd'

const Option = Select

const AdminManage = (props) => {
  if (!props.items[0]) {
    return (
      <Select placeholder='이름을 선택해 주세요' allowClear>
        <Option value='undefined'>등록된 관리자가 없습니다.</Option>
      </Select>
    )
  }
  return (
    <Select
      placeholder='이름을 선택해 주세요.'
      onChange={props.onChange}
      allowClear
    >
      {console.log(props.items[0])}
      {props.items.map((admin) => (
        <Option value={admin}>{admin}</Option>
      ))}
    </Select>
  )
}

export default AdminManage

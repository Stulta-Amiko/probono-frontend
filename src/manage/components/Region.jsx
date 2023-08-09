import React from 'react'
import { Select } from 'antd'

const Option = Select

const Region = (props) => {
  if (!props.items[0]) {
    return (
      <Select placeholder='지역을 선택해 주세요' allowClear>
        <Option value='undefined'>등록된 지역이 없습니다.</Option>
      </Select>
    )
  }
  return (
    <Select
      placeholder='지역을 선택해 주세요'
      onChange={props.onChange}
      allowClear
    >
      {console.log(props.items[0])}
      {props.items.map((region) => (
        <Option value={region}>{region}</Option>
      ))}
    </Select>
  )
}

export default Region

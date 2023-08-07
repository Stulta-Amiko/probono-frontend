import React, { useState } from 'react'
import { Space, Table, Button } from 'antd'
const columns = [
  {
    title: '이름',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '주소',
    dataIndex: 'address',
    key: 'age',
  },
  {
    title: '생년월일',
    dataIndex: 'birthDate',
    key: 'address',
  },
  {
    title: '체크현황',
    dataIndex: 'checkDate',
    key: 'address',
  },
  {
    title: '특이사항',
    dataIndex: 'remark',
    key: 'address',
  },
  {
    title: '알림보내기',
    key: 'action',
    render: (_, record) => (
      <Space size='middle'>
        <Button
          type='link'
          htmlType='button'
          href={
            '/' /* 알림요청하는 백엔드 주소로 추후 설정예정 record 이용해서 각 사용자별 전송 기능 */
          }
        >
          알림보내기
        </Button>
      </Space>
    ),
  },
]

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
} //데이터를 위한 임시 난수발생기, 백엔드 연결 후 삭제요망

const data = []
for (let i = 0; i < 46; i++) {
  data.push({
    key: i, // 추후 백엔드 연결시 key = database의 id값으로 설정
    id: i,
    name: `John Brown ${i}`,
    birthDate: `${getRandomIntInclusive(1900, 1970)}-${getRandomIntInclusive(
      1,
      12
    )}-${getRandomIntInclusive(1, 31)}`,
    checkDate: '2023-08-07T13:01:42.000Z',
    remark: `특이사항 ${i}`,
    address: `주소 ${i}`,
  })
}

const ManageClient = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  }
  return (
    <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
  )
}
export default ManageClient

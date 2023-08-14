import React, { useState, useEffect, useContext } from 'react'
import { Space, Table, Button } from 'antd'
import { AuthContext } from '../../context/auth-context'
import { useHttpClient } from '../../shared/hooks/http-hook'

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
    key: 'address',
  },
  {
    title: '생년월일',
    dataIndex: 'birthDate',
    key: 'birthDate',
  },
  {
    title: '체크현황',
    dataIndex: 'checkDate',
    key: 'checkDate',
  },
  {
    title: '특이사항',
    dataIndex: 'remark',
    key: 'remark',
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

const LoadUsers = (props) => {
  const data = []
  const auth = useContext(AuthContext)
  const [loadedUsers, setLoadedUsers] = useState()

  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_ADDRESS + '/users/aid/' + auth.userId
        )
        console.log(responseData.users)
        setLoadedUsers(responseData.users)
      } catch (err) {}
    }
    fetchUsers()
  }, [sendRequest])

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
  if (!loadedUsers) {
    return (
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    )
  }
  loadedUsers.map((user) =>
    data.push({
      key: user.id,
      id: user.id,
      name: user.name,
      birthDate: user.birthdate,
      checkDate: user.checkdate,
      remark: user.remark,
      address: user.address,
    })
  )
  return (
    <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
  )
}

export default LoadUsers

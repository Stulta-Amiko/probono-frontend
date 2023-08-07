import React, { useState, useContext } from 'react'
import { UserAddOutlined, UserOutlined, LoginOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../../context/auth-context'

const MainNavigation = () => {
  const auth = useContext(AuthContext)

  const items = [
    {
      label: (
        <NavLink to='/manage' exact>
          담당구역별 알림 전송하기
        </NavLink>
      ),
      key: 'sendNoti',
      icon: <UserOutlined />,
      // disabled: !auth.isLoggedin, 추후 백엔드 연결시 혹은 로그인 기능 완전구현시 사용
    },
    {
      label: (
        <NavLink to='/' exact>
          유저 추가하기
        </NavLink>
      ),
      key: 'addUser',
      icon: <UserAddOutlined />,
    },
    {
      label: (
        <NavLink to='/auth' exact>
          로그인
        </NavLink>
      ),
      key: 'login',
      icon: <LoginOutlined />,
    },
  ]

  const [current, setCurrent] = useState('mail')
  const onClick = (e) => {
    console.log('click ', e)
    setCurrent(e.key)
  }
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode='horizontal'
      items={items}
    />
  )
}
export default MainNavigation

import React, { useState, useContext } from 'react'
import {
  UserAddOutlined,
  UserOutlined,
  LoginOutlined,
  LogoutOutlined,
  DesktopOutlined,
} from '@ant-design/icons'
import { Menu } from 'antd'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../../context/auth-context'

const MainNavigation = () => {
  const auth = useContext(AuthContext)

  const items = [
    {
      label: auth.isLoggedin ? (
        <NavLink to='/manage' exact>
          담당구역별 알림 전송하기
        </NavLink>
      ) : (
        <NavLink to='/auth' exact>
          담당구역별 알림 전송하기
        </NavLink>
      ),
      key: 'sendNoti',
      icon: <UserOutlined />,
      disabled: !auth.isLoggedin,
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
        <NavLink to='/authority' exact>
          관리자 기능 추가하기
        </NavLink>
      ),
      key: 'addAuth',
      icon: <DesktopOutlined />,
    },
    {
      label: auth.isLoggedin ? (
        <NavLink to='/' onClick={auth.logout} exact>
          로그아웃
        </NavLink>
      ) : (
        <NavLink to='/auth' exact>
          로그인
        </NavLink>
      ),
      key: 'login',
      icon: auth.isLoggedin ? <LogoutOutlined /> : <LoginOutlined />,
    },
  ]

  const [current, setCurrent] = useState('mail')
  const onClick = (e) => {
    console.log('click ', e)
    console.log(auth.isLoggedin)
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

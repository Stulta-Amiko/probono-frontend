import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import { AuthContext } from './context/auth-context'
import { useAuth } from './shared/hooks/auth-hook'
import MainNavigation from './shared/components/Navigation/MainNavigation'
import Auth from './manage/pages/Auth'
import ManageClient from './users/pages/ManageClient'
import AdminAuth from './manage/pages/AdminAuth'
import AddUser from './users/pages/AddUser'

function App() {
  const { token, login, logout, userId } = useAuth()
  let routes

  if (token) {
    routes = (
      <Routes>
        <Route path='/auth' exact element={<Auth />} />
        <Route path='/manage' exact element={<ManageClient />} />
        <Route path='/authority' exact element={<AdminAuth />} />
        <Route path='/adduser' exact element={<AddUser />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    )
  } else {
    routes = (
      <Routes>
        <Route path='/auth' exact element={<Auth />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    )
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedin: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  )
}

export default App

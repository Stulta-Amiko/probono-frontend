import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import MainNavigation from './shared/components/Navigation/MainNavigation'
import Auth from './manage/pages/Auth'
import Register from './manage/pages/Register'
import ManageClient from './users/pages/ManageClient'

function App() {
  let routes

  routes = (
    <Routes>
      <Route path='/auth' exact element={<Auth />} />
      <Route path='/manage' exact element={<ManageClient />} />
    </Routes>
  )
  return (
    <Router>
      <MainNavigation />
      <main>{routes}</main>
    </Router>
  )
}

export default App

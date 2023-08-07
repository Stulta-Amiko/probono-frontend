import React from 'react'
import { Card } from 'antd'

import RegisterIn from '../components/RegisterIn'
import './Register.css'

const Register = (props) => {
  return (
    <div className='top-auth'>
      <div className='auth'>
        <Card style={{ width: 500 }}>
          <RegisterIn />
        </Card>
      </div>
    </div>
  )
}

export default Register

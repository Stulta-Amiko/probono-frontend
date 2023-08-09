import React, { useContext, useState } from 'react'
import { Card, Modal, Button, Form, Spin } from 'antd'
import { useNavigate } from 'react-router-dom'

//import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import AuthIn from '../components/AuthIn'
import { useForm } from '../../shared/hooks/form-hook'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { AuthContext } from '../../context/auth-context'

import './Auth.css'
import RegisterIn from '../components/RegisterIn'
import Authority from './Authority'

const AdminAuth = (props) => {
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const [form] = Form.useForm()
  const auth = useContext(AuthContext)
  const [isLoginMode, setIsLoginMode] = useState(true)
  const { isLoding, error, sendRequest } = useHttpClient()
  let navigate = useNavigate()

  const [formState, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: true,
      },
      password: {
        value: '',
        isValid: true,
      },
    },
    true
  )

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          pwdCofirm: undefined,
          region: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      )
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: true,
          },
          pwdCofirm: {
            value: '',
            isValid: true,
          },
          region: {
            value: '',
            isValid: true,
          },
        },
        true
      )
    }
    setIsLoginMode((prevMode) => !prevMode)
  }

  const loginSubmitHandler = async (values, event) => {
    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_ADDRESS + '/admin/login',
          'POST',
          JSON.stringify({
            email: values.email,
            password: values.email,
          }),
          {
            'Content-Type': 'application/json',
          }
        )
        auth.login(responseData.adminId, responseData.token)
        navigate('/')
      } catch (err) {}
    } else {
      try {
        console.log(values.email)
        let regionId = await sendRequest(
          process.env.REACT_APP_BACKEND_ADDRESS +
            `/region/name/${values.region}`,
          'GET'
        )
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_ADDRESS + '/admin/signup',
          'POST',
          JSON.stringify({
            name: values.name,
            email: values.email,
            password: values.email,
            region_id: regionId.region_id,
          }),
          {
            'Content-Type': 'application/json',
          }
        )
        auth.login(responseData.adminId, responseData.token)
        navigate('/')
      } catch (err) {}
    }
  }

  const ErrorModal = (props) => {
    Modal.error({
      title: props.error,
      content: props.error,
    })
  }

  return (
    <React.Fragment>
      {error && <ErrorModal error={error} />}
      <div className='top-auth'>
        <div className='auth'>
          <Card style={{ width: 500 }}>
            <Form
              name='basic'
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                maxWidth: 600,
              }}
              initialValues={{
                remember: true,
              }}
              form={form}
              onFinish={loginSubmitHandler}
              onFinishFailed={onFinishFailed}
              autoComplete='off'
            >
              <Authority />
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type='primary' htmlType='submit'>
                  가입하기
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </React.Fragment>
  )
}

export default AdminAuth

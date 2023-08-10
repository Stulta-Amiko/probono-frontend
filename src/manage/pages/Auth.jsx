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

const Auth = (props) => {
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const [form] = Form.useForm()
  const auth = useContext(AuthContext)
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [modalDisplayed, setModalDisplayed] = useState(false)
  const { isLoding, error, sendRequest, clearError } = useHttpClient()
  let navigate = useNavigate()

  const switchModeHandler = () => {
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
            Authorization: 'Bearer ' + auth.token,
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
            Authorization: 'Bearer ' + auth.token,
          }
        )
        auth.login(responseData.adminId, responseData.token)
        navigate('/')
      } catch (err) {}
    }
  }

  const ErrorModal = () => {
    if (!modalDisplayed) {
      setModalDisplayed(true)
      Modal.error({
        title: error,
        content: null,
        onOk: () => {
          setModalDisplayed(false)
          clearError()
        },
      })
    }
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
              {isLoding && <Spin asOverlay />}
              {!isLoginMode && <RegisterIn />}
              {!!isLoginMode && <AuthIn />}
              <Button type='link' htmlType='button' onClick={switchModeHandler}>
                {isLoginMode ? '회원가입' : '로그인으로 돌아가기'}
              </Button>
            </Form>
          </Card>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Auth

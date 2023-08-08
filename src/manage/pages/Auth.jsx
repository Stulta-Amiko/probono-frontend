import React, { useContext, useState } from 'react'
import { Card, Modal, Button, Form, Spin } from 'antd'

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

  const [form_data] = Form.useForm()
  const auth = useContext(AuthContext)
  const [isLoginMode, setIsLoginMode] = useState(true)
  const { isLoding, error, sendRequest, clearError } = useHttpClient()

  const [formState, inputHandler, setFormData] = useForm(
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

  const loginSubmitHandler = async (e) => {
    //e.preventDefault()

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_ADDRESS + '/admin/login',
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            'Content-Type': 'application/json',
          }
        )
        console.log(responseData)
        auth.login(responseData.userId, responseData.token)
      } catch (err) {}
    } else {
      try {
        const formData = new FormData()

        console.log(form_data.getFieldValue('email'))
        const regionId = await sendRequest(
          process.env.REACT_APP_BACKEND_ADDRESS +
            `/region/name/${form_data.getFieldValue('region')}`,
          'GET'
        )
        console.log(regionId)
        formData.append('email', form_data.getFieldValue('email'))
        formData.append('name', form_data.getFieldValue('name'))
        formData.append('password', form_data.getFieldValue('password'))
        formData.append('region_id', regionId)
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_ADDRESS + '/admin/signup',
          'POST',
          formData
        )
        console.log(formData)
        auth.login(responseData.userId, responseData.token)
      } catch (err) {}
    }
  }

  const ErrorModal = (props) => {
    Modal.error({
      title: props.error,
      content: props.error,
    })
    console.log(props.error)
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

import React, { useContext, useState } from 'react'
import { Card, Modal, Button, Form } from 'antd'

//import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import AuthIn from '../components/AuthIn'
import { useForm } from '../../shared/hooks/form-hook'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { AuthContext } from '../../context/auth-context'

import './Auth.css'
import RegisterIn from '../components/RegisterIn'

const Auth = (props) => {
  const auth = useContext(AuthContext)
  const [isLoginMode, setIsLoginMode] = useState(true)
  const { isLoding, error, sendRequest, clearError } = useHttpClient()

  const onFinish = (values) => {
    console.log('Success:', values)
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
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
            isValid: false,
          },
          pwdCofirm: {
            value: '',
            isValid: false,
          },
          region: {
            value: '',
            isValid: false,
          },
        },
        false
      )
    }
    setIsLoginMode((prevMode) => !prevMode)
  }

  const loginSubmitHandler = async (event) => {
    event.preventDefault()

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_ADDRESS + '/users/login',
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            'Content-Type': 'application/json',
          }
        )
        auth.login(responseData.userId, responseData.token)
      } catch (err) {}
    } else {
      try {
        const formData = new FormData()
        formData.append('email', formState.inputs.email.value)
        formData.append('name', formState.inputs.name.value)
        formData.append('password', formState.inputs.password.value)
        formData.append('image', formState.inputs.image.value)
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_ADDRESS + '/users/signup',
          'POST',
          formData
        )
        auth.login(responseData.userId, responseData.token)
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
            {!isLoginMode && <RegisterIn />}
            {!!isLoginMode && <AuthIn />}
            <Button type='link' htmlType='button' onClick={switchModeHandler}>
              {isLoginMode ? '회원가입' : '로그인으로 돌아가기'}
            </Button>
          </Card>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Auth

import React, { useContext, useState } from 'react'
import { Card, Modal, Button, Form, Spin } from 'antd'
import { useNavigate } from 'react-router-dom'

//import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { AuthContext } from '../../context/auth-context'

import '../../manage/pages/Auth'
import RegisterUser from '../components/RegisterUser'

const AddUser = (props) => {
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const [form] = Form.useForm()
  const auth = useContext(AuthContext)
  const [isLoginMode, setIsLoginMode] = useState(true)
  const { isLoding, error, sendRequest, clearError } = useHttpClient()
  let navigate = useNavigate()

  const submitHandler = async (values, event) => {
    try {
      let adminId = await sendRequest(
        process.env.REACT_APP_BACKEND_ADDRESS +
          `/admin/name/${values.user_name}`,
        'GET'
      )
      console.log(adminId.adminId)
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_ADDRESS + '/admin/authority',
        'POST',
        JSON.stringify({
          is_super: values.is_super,
          is_admin: values.is_admin,
          is_user: values.is_user,
          admin_id: adminId.adminId,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        }
      )
      console.log(responseData)
      navigate('/')
    } catch (err) {}
  }

  const [modalDisplayed, setModalDisplayed] = useState(false)

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
      {console.log(error)}
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
              onFinish={submitHandler}
              onFinishFailed={onFinishFailed}
              autoComplete='off'
            >
              <RegisterUser />
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type='primary' htmlType='submit'>
                  등록하기
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </React.Fragment>
  )
}

export default AddUser

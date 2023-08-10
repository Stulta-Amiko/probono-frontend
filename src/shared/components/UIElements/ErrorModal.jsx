import React, { useState } from 'react'

import { useHttpClient } from '../../hooks/http-hook'
import { Modal } from 'antd'

const ErrorModal = () => {
  const [modalDisplayed, setModalDisplayed] = useState(false)
  const { isLoding, error, sendRequest, clearError } = useHttpClient()
  if (!modalDisplayed) {
    setModalDisplayed(true)
    return Modal.error({
      title: error,
      content: null,
      onOk: () => {
        setModalDisplayed(false)
        clearError()
      },
    })
  }
}
export default ErrorModal

import React, { useState } from 'react'
import Navbar from '../../layout/NavBar/Navbar'
import styles from './Application.module.css'
import ApplicationForm from '../../features/application/components/ApplicationForm/ApplicationForm'
import ApplicationQuestions from '../../features/application/components/ApplicationQuestions/ApplicationQuestions'
import { Col, Row } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { resetApplicationForm } from '../../features/application/applicationSlice'
import { STATUS_DICT } from '../../constants'

function Application() {
  const [show, setShow] = useState({ applicationForm: true, applicationQuestions: false })
  const onQuestionSelect = () => setShow({ applicationForm: false, applicationQuestions: true })
  const onApplicationSelect = () => setShow({ applicationForm: true, applicationQuestions: false })
  const applicationFormResult = useSelector(state => state.default.application.applicationForm)
  const dispatch = useDispatch()

  const showApplicationForm = show => {
    if (show) return onApplicationSelect()
    return onQuestionSelect()
  }

  useEffect(() => {
    if (show.applicationQuestions && applicationFormResult.status === STATUS_DICT.FINISHED) {
      dispatch(resetApplicationForm())
    }
  }, [show.applicationQuestions, dispatch, applicationFormResult.status])

  return (
    <Row className={styles.applicationWrapper}>
      <Col span={18} className={styles.application}>
        <Navbar showForm={showApplicationForm} />
        <div className={styles.applicationContent}>
          {(() => {
            if (show.applicationForm) {
              if (applicationFormResult.status === STATUS_DICT.FINISHED) {
                return <></>
              }
              return <ApplicationForm />
            }
            return <ApplicationQuestions />
          })()}
        </div>
      </Col>
    </Row>
  )
}

export default Application

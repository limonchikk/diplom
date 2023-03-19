import React, { useState } from 'react'
import Navbar from '../../layout/NavBar/Navbar'
import styles from './Application.module.css'
import ApplicationForm from '../../features/application/components/ApplicationForm/ApplicationForm'
import ApplicationQuestions from '../../features/application/components/ApplicationQuestions/ApplicationQuestions'
import { Col, Row } from 'antd'

function Application() {
  const [show, setShow] = useState({ applicationForm: true, applicationQuestions: false })
  const onQuestionSelect = () => setShow({ applicationForm: false, applicationQuestions: true })
  const onApplicationSelect = () => setShow({ applicationForm: true, applicationQuestions: false })

  const showApplicationForm = show => {
    if (show) return onApplicationSelect()
    return onQuestionSelect()
  }

  return (
    <Row className={styles.applicationWrapper}>
      <Col span={18} className={styles.application}>
        <Navbar showForm={showApplicationForm} />
        <div className={styles.applicationContent}>
          {show.applicationForm ? <ApplicationForm /> : <ApplicationQuestions />}
        </div>
      </Col>
    </Row>
  )
}

export default Application

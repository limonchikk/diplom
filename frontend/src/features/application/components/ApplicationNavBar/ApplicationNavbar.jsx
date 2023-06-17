import { Col, Row } from 'antd'
import { useState } from 'react'
import AHrefJavascript from '../../../../common/components/link-js/Link'
import styles from './ApplicationNavbar.module.css'

function Navbar({ showForm }) {
  let [active, setActive] = useState({ form: true, questions: false })

  const onApplicationQuestionSelect = () => {
    active = setActive({ questions: true, form: false })
    return showForm(false)
  }
  const onApplicationFormSelect = () => {
    active = setActive({ questions: false, form: true })
    return showForm(true)
  }

  return (
    <Row>
      <Col span={12} className={`${styles.navbarElement} ${active.questions ? styles.active : null}`}>
        <AHrefJavascript className={styles.navbarLink} onClick={onApplicationQuestionSelect}>
          Still have questions? We’ll answer
        </AHrefJavascript>
      </Col>
      <Col span={12} className={`${styles.navbarElement} ${active.form ? styles.active : null}`}>
        <AHrefJavascript className={styles.navbarLink} onClick={onApplicationFormSelect}>
          Apply for training
        </AHrefJavascript>
      </Col>
    </Row>
  )
}

export default Navbar

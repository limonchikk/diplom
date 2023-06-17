import Logo from '../../../../common/img/logo.webp'
import styles from './ApplicationHeader.module.css'
import { Col, Row } from 'antd'

function Header() {
  return (
    <Row className={styles.header}>
      <Col span={1} className={styles.headerLogo}>
        <img src={Logo} alt='Logo' className={styles.headerLogoImg} />
      </Col>
      <Col className={styles.headerTitle}>
        <h1>Medical University of Chemical Technology</h1>
        <h2>Preparatory department</h2>
      </Col>
    </Row>
  )
}

export default Header

import { Form, Input, Button, Row, Col } from 'antd'
import styles from './Login.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { applyLogin } from '../../features/auth/authSlice'
import { STATUS_DICT } from '../../constants'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { PATH_DICT } from '../../app/routes'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { token, status } = useSelector(state => state.default.auth)

  const onFinish = values => {
    console.log(values)
    dispatch(applyLogin(values))
  }

  useEffect(() => {
    if (status === STATUS_DICT.FINISHED) {
      navigate(PATH_DICT.ADMIN_PANEL)
    }
  }, [status])

  return (
    <Row align='middle' justify='space-around' style={{ height: '100%', flexGrow: 1 }}>
      <Col size='large' validatetrigger='onBlur' span={12}>
        <Form size='large' layout='vertical' validatetrigger='onBlur' className={styles.loginForm} onFinish={onFinish}>
          <h1 className={styles.loginHeading} align='center'>
            Вход в личный кабинет
          </h1>
          <Form.Item label='Логин' name='login'>
            <Input style={{ padding: '10px' }} autoComplete='new-password' />
          </Form.Item>
          <Form.Item label='Пароль' name='password'>
            <Input.Password style={{ padding: '10px' }} autoComplete='new-password' />
          </Form.Item>

          <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              type='primary'
              htmlType='submit'
              loading={status === STATUS_DICT.PENDING}
              className={`btn ${styles.loginSubmitBtn}`}
              size='large'
            >
              Войти
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}
export default Login

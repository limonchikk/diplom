import { Row, Col, Button, Input, message } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import css from './AdminPanel.module.css'
import { getAdminData, updateAdminData } from '../../features/adminPage/adminPageSlice'
import { STATUS_DICT } from '../../constants'
import AHrefJavascript from '../../components/link-js/Link'
import NewApplicationCart from '../../features/adminPage/components/newApplicationCart/NewApplicationCart'
import { getApplications } from '../../features/application/applicationSlice'

// const childComponents = [
//   {
//     dataType: 'newApplication',
//     component: <NewApplicationCart />
//   },
//   // {
//   //   dataType: 'allApplication',
//   //   component: <AllApplicationCart />
//   // },
//   // {
//   //   dataType: 'analytics',
//   //   component: <AnalyticsCart />
//   // },
// ]

const AdminPanel = () => {
  const { data, status } = useSelector(state => state.default.admin.adminData)
  const applicationsRaw = useSelector(state => state.default.application.applications)
  const [email, setEmail] = useState('')
  const [applications, setApplications] = useState({ applications: [], count: 0 })
  const [isAdminDataUpdate, setAdminDataUpdate] = useState(false)
  const dispatch = useDispatch()
  const [messageApi, contextHolder] = message.useMessage()

  const [count, setCount] = useState(0)

  let [active, setActive] = useState('newApplication')

  const chlidComponentsDataTypeHandler = type => {
    setActive(type)
  }

  const childComponents = {
    newApplication: <NewApplicationCart count={setCount} />,
  }

  useEffect(() => {
    console.log('get admin data')
    setAdminDataUpdate(false)
    dispatch(getAdminData())
  }, [dispatch])

  useEffect(() => {
    console.log(applicationsRaw.status)
    if (applicationsRaw.status === STATUS_DICT.FINISHED) {
      console.log(applicationsRaw.data)
      setApplications({ applications: applicationsRaw.data.applications, count: applicationsRaw.data.count })
    }
  }, [applicationsRaw.data, applicationsRaw.status])

  useEffect(() => {
    if (status === STATUS_DICT.FINISHED) {
      if (isAdminDataUpdate) {
        messageApi.open({
          type: 'success',
          content: 'Адрес электронной почты успешно обновлен!',
          duration: 1,
        })
      }
      console.log(status)
      console.log(data)
      console.log('status changed')
      setEmail(data?.email)
    }
  }, [data, status])

  const changeAdminEmail = () => {
    console.log('test')
    setAdminDataUpdate(true)
    dispatch(updateAdminData({ email }))
  }

  return (
    <div className={css.adminPanelWrapper}>
      {contextHolder}
      <Row className={css.adminPanelHeading} justify='space-between'>
        <Col size='large' validatetrigger='onBlur' span={20}>
          <h1 className={css.adminPanelHeading}>Добро пожаловать в личный кабинет</h1>
        </Col>
        <Col size='large' validatetrigger='onBlur' span={4}>
          <Button style={{ width: '100%' }} type='primary' htmlType='submit' size='large'>
            Выйти
          </Button>
        </Col>
      </Row>
      <Row className={css.adminPanelHeading} style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
        <Col size='large' validatetrigger='onBlur'>
          <p style={{ paddingRight: '8px' }}>Ваша почта: </p>
        </Col>
        <Col size='large' validatetrigger='onBlur'>
          <Input
            className={css.adminPageInputEmail}
            value={email}
            onChange={e => setEmail(e.target.value)}
            onBlur={changeAdminEmail}
          />
        </Col>
      </Row>
      <Row gutter={25} style={{ paddingTop: '60px' }}>
        <Col span={8}>
          <AHrefJavascript
            className={`${active === 'newApplication' ? css.active : null} ${css.adminPanelNavBarItem}`}
            onClick={() => chlidComponentsDataTypeHandler('newApplication')}
          >
            Новые заявки: {count}
          </AHrefJavascript>
        </Col>
        <Col span={8}>
          <AHrefJavascript
            className={`${active === 'allApplication' ? css.active : null} ${css.adminPanelNavBarItem}`}
            onClick={() => chlidComponentsDataTypeHandler('allApplication')}
          >
            База заявок
          </AHrefJavascript>
        </Col>
        <Col span={8}>
          <AHrefJavascript
            className={`${active === 'analytic' ? css.active : null} ${css.adminPanelNavBarItem}`}
            onClick={() => chlidComponentsDataTypeHandler('analytic')}
          >
            Аналитика
          </AHrefJavascript>
        </Col>
      </Row>
      <Row style={{ paddingTop: '60px' }}>
        <Col span={24}>{childComponents[active]}</Col>
      </Row>
    </div>
  )
}

export default AdminPanel

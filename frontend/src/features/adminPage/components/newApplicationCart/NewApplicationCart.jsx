import { Row, Col, Collapse, Descriptions } from 'antd'
import css from './NewApplicationCart.module.css'
import { v4 as uuidv4, v4 } from 'uuid'
import { useEffect, useState } from 'react'
import { getApplications, resetApplications } from '../../../application/applicationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { STATUS_DICT } from '../../../../constants'

const { Panel } = Collapse

function NewApplicationCart({ count }) {
  const { status, data } = useSelector(state => state.default.application.applications)
  const [state, setState] = useState({ data: [] })
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(status)
    if (status === STATUS_DICT.FINISHED) {
      setState(prevState => ({ ...prevState, data: data.applications }))
      count(data.count)
    }
  }, [data, status])

  useEffect(() => {
    dispatch(getApplications())
    return () => dispatch(resetApplications())
  }, [dispatch])

  return (
    <Row gutter={90} style={{ paddingBottom: '20px' }}>
      <Col span={24}>
        {state.data.map((application, id) => (
          <Collapse key={application.applicationId}>
            <Panel
              header={`${application.applicantSurname} ${application.applicantName} ${application.applicantPatronymic}`}
            >
              <Row gutter={60}>
                <Col span={12}>
                  <Descriptions layout='horizontal' column={1} bordered>
                    <Descriptions.Item label=''>Cloud Database</Descriptions.Item>
                    <Descriptions.Item label='Billing Mode'>Prepaid</Descriptions.Item>
                    <Descriptions.Item label='Automatic Renewal'>YES</Descriptions.Item>
                    <Descriptions.Item label='Order time'>2018-04-24 18:00:00</Descriptions.Item>
                  </Descriptions>
                </Col>
                <Col span={12}>
                  <Descriptions layout='horizontal' column={1} bordered>
                    <Descriptions.Item label='Product'>Cloud Database</Descriptions.Item>
                    <Descriptions.Item label='Billing Mode'>Prepaid</Descriptions.Item>
                    <Descriptions.Item label='Automatic Renewal'>YES</Descriptions.Item>
                    <Descriptions.Item label='Order time'>2018-04-24 18:00:00</Descriptions.Item>
                  </Descriptions>
                </Col>
              </Row>
            </Panel>
          </Collapse>
        ))}
      </Col>
    </Row>
  )
}

export default NewApplicationCart

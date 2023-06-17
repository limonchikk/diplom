import { Row, Col, Collapse, Button } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { STATUS_DICT } from '../../../../constants'
import { Form, Select, DatePicker } from 'antd'
import formStyles from './AnalyticCart.module.css'

import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import moment from 'moment'
import { getStatistics } from '../../../application/applicationSlice'

const { Panel } = Collapse

function AnalyticCart({ count }) {
  let [chartData, setChartData] = useState([])
  let [datePicker, setDatePicker] = useState(null)
  let [chartType, setChartType] = useState(null)
  const dispatch = useDispatch()
  const statistics = useSelector(state => state.default.application.statistics)

  useEffect(() => {
    if (statistics.status === STATUS_DICT.FINISHED) {
      const tmp = statistics.data.map(b => {
        if (chartType === 'month') {
          return {
            key: moment(b.key).local().format('YYYY-MM'),
            value: b.count,
          }
        }
        if (chartType === 'year') {
          return {
            key: moment(b.key).local().format('YYYY'),
            value: b.count,
          }
        }
        return {
          key: b.key,
          value: b.count,
        }
      })
      setChartData(tmp)
    }
  }, [dispatch, statistics])

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={formStyles.customTooltip}>
          <p className='label'>{`${label}: ${payload[0].value}`}</p>
        </div>
      )
    }

    return null
  }

  const onFinish = async values => {
    setChartType(values.groupBy)
    dispatch(
      getStatistics({
        ...values,
        from: moment(datePicker[0].format('YYYY-MM-DD HH:mm')).toISOString(),
        to: moment(datePicker[1].format('YYYY-MM-DD HH:mm')).toISOString(),
      })
    )
  }

  return (
    <>
      <Form size='large' layout='vertical' validateTrigger='onBlur' onFinish={onFinish}>
        <Row justify='space-between' style={{ paddingBottom: '20px' }}>
          <Col size='large' validatetrigger='onBlur' span={10}>
            <Form.Item name='groupBy' label='Тип анализа' className={formStyles.formInput}>
              <Select placeholder='Тип анализа не выбран'>
                <Select.Option value='applicant_registration_country'>Заявки по странам</Select.Option>
                <Select.Option value='applicant_preferred_direction_of_study'>Заявки по направлениям</Select.Option>
                <Select.Option value='month'>Заявки по месяцам</Select.Option>
                <Select.Option value='year'>Заявки по годам</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label='Выберите интервал поиска' getValueProps={i => ({ value: i })}>
              <Row style={{ display: 'flex', flexDirection: 'row' }}>
                <DatePicker.RangePicker
                  placeholder={['Начальная дата', 'Конечная дата']}
                  className={formStyles.formInput}
                  onChange={e => setDatePicker(e)}
                  format='YYYY-MM-DD'
                />
              </Row>
            </Form.Item>
            <Form.Item>
              <Button type='primary' className={`btn ${formStyles.submitFormBtn}`} htmlType='submit'>
                Рассчитать
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Row style={{ paddingBottom: '20px' }}>
        <Col span={24} style={{ height: '400px' }}>
          {/* <Space size='middle' className={active.questions ? styles.active : null}>
            <Spin size='large' />
          </Space> */}
          {/* className={active.questions ? styles.active : null} */}
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart
              width={500}
              height={300}
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              barSize={20}
            >
              <XAxis dataKey='key' scale='point' padding={{ left: 60, right: 60 }} />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey='value' fill='#0d66a7' background={{ fill: '#eee' }} />
            </BarChart>
          </ResponsiveContainer>
        </Col>
      </Row>
    </>
  )
}

export default AnalyticCart

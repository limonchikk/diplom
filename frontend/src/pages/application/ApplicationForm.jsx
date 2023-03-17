import styles from './Application.module.css'
import './ApplicationForm.module.css'
import {
  Form,
  Input,
  Button,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  Upload,
  OTPInput,
} from 'antd'

import { useState } from 'react'

const { RangePicker } = DatePicker
const { TextArea } = Input

function ApplicationForm() {
  let [phoneNumber, setPhoneNumber] = useState()

  return (
    <>
      <h2 className={styles.applicationHeading}>Форма подачи заявки на обучение</h2>
      <p>Прием заявок осуществляется в период с 1 июля до 1 ноября</p>
      <h3>Обратите внимание:</h3>
      <ul>
        <li>1. Заявление подается на платное обучение</li>
        <li>2. Возраст заявителя должен находится в пределах от 18 до 40 лет</li>
      </ul>

      <h4>Заявка на обучение</h4>
      <Form>
        <Form.Item>
          <Input placeholder='ФИО' />
        </Form.Item>
        <Form.Item>
          <DatePicker placeholder='Дата рождения' />
        </Form.Item>
        <Form.Item>
          <Select placeholder='Пол'>
            <Select.Option value='male'>Мужской</Select.Option>
            <Select.Option value='female'>Женский</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Input
            placeholder='Номер телефона'
            onChange={e => {
              const telNo = e.target.value
              const re = /^[0-9\b]+$/
              if (telNo === '' || re.test(telNo)) {
                phoneNumber = setPhoneNumber(e.target.value)
              }
            }}
            type='number'
          />
        </Form.Item>

        {/* <Form.Item label='TreeSelect'>
          <TreeSelect
            treeData={[{ title: 'Light', value: 'light', children: [{ title: 'Bamboo', value: 'bamboo' }] }]}
          />
        </Form.Item>
        <Form.Item label='Cascader'>
          <Cascader
            options={[
              {
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [
                  {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                  },
                ],
              },
            ]}
          />
        </Form.Item>
        <Form.Item label='RangePicker'>
          <RangePicker />
        </Form.Item>
        <Form.Item label='InputNumber'>
          <InputNumber />
        </Form.Item>
        <Form.Item label='TextArea'>
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label='Switch' valuePropName='checked'>
          <Switch />
        </Form.Item>
        <Form.Item label='Upload' valuePropName='fileList'>
          <Upload action='/upload.do' listType='picture-card'>
            <div>
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item label='Button'>
          <Button>Button</Button>
        </Form.Item> */}
      </Form>
    </>
  )
}

export default ApplicationForm

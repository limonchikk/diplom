import applicationStyles from './Application.module.css'
import formStyles from './ApplicationForm.module.css'
import { Form, Input, Button, Select, DatePicker } from 'antd'
import { useState, useRef } from 'react'
import { MaskedInput } from 'antd-mask-input'
import { Row, Col } from 'antd'
import InputMask from 'react-input-mask'

function ApplicationForm() {
  let [phoneNumber, setPhoneNumber] = useState()

  const formInputRef = useRef(null)

  console.log(formInputRef)

  const onFinish = values => {
    console.log(values)
    console.log({ ...values, phone: phoneNumber })
  }

  // useEffect(() => {
  //   if (formInputRef.current) {
  //     console.log(123)
  //     IMask(formInputRef.current, maskOptions)
  //   }
  // }, [formInputRef.current])

  return (
    <>
      <h2 className={applicationStyles.applicationHeading}>Форма подачи заявки на обучение</h2>
      <p>Прием заявок осуществляется в период с 1 июля до 1 ноября</p>
      <h3>Обратите внимание:</h3>
      <ul>
        <li>1. Заявление подается на платное обучение</li>
        <li>2. Возраст заявителя должен находится в пределах от 18 до 40 лет</li>
      </ul>

      <h4>Заявка на обучение</h4>
      <Form onFinish={onFinish} size='large'>
        <Form.Item name='fio'>
          <Input placeholder='ФИО' className={formStyles.formInput} />
        </Form.Item>
        <Form.Item name='birthDate'>
          <DatePicker placeholder='Дата рождения' className={formStyles.formInput} />
        </Form.Item>
        <Form.Item name='sex'>
          <Select placeholder='Пол'>
            <Select.Option value='male'>Мужской</Select.Option>
            <Select.Option value='female'>Женский</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name='phone'>
          <MaskedInput
            onChange={({ unmaskedValue }) => {
              setPhoneNumber(unmaskedValue)
              return unmaskedValue
            }}
            placeholder='Номер телефона'
            mask={
              //  https://imask.js.org/guide.html#masked-pattern
              '+7(000)000-00-00'
            }
          />
        </Form.Item>

        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form>
    </>
  )
}

export default ApplicationForm

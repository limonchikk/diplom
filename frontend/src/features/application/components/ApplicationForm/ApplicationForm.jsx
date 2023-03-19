import applicationStyles from '../../../../pages/application/Application.module.css'
import formStyles from './ApplicationForm.module.css'
import { Form, Input, Button, Select, DatePicker, Row, Col, Upload, Checkbox } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useRef, useEffect, useState } from 'react'
import IMask from 'imask'
import { STATUS_DICT } from '../../../../constants'
import { useSelector, useDispatch } from 'react-redux'
import { getCountries } from '../../applicationSlice'

const maskOptions = {
  mask: '+{7}(000)000-00-00',
}

function ApplicationForm() {
  const dispatch = useDispatch()
  const countries = useSelector(state => state.default.application.countries)
  const applicantPhoneNumberInputRef = useRef(null)
  const applicantUnmaskedPhoneNumberRef = useRef(null)
  const representativePhoneNumberInputRef = useRef(null)
  const representativeUnmaskedPhoneNumberRef = useRef(null)
  const [applicantBirthDate, setApplicantBirthDate] = useState('')
  const [showRepresentative, setShowRepresentative] = useState(false)

  const onApplicantBirthDateChange = (date, dateString) => {
    setApplicantBirthDate(dateString)
  }

  const onChecked = e => {
    if (e.target.checked) {
      return setShowRepresentative(true)
    }
    return setShowRepresentative(false)
  }

  const onFinish = values => {
    const {
      passportOriginal,
      russianPassport,
      educationDocumentOriginal,
      russianEducationDocument,
      representativeName,
      representativeSurname,
      representativePatronymic,
      representativePhoneNumber,
      representativeEmail,
      isRepresentative,
      ...applicantFormData
    } = values

    let representative = {}

    if (representativeEmail && representativePhoneNumber && isRepresentative) {
      Object.assign(representative, {
        name: representativeName,
        surname: representativeSurname,
        patronymic: representativePatronymic,
        email: representativeEmail,
        phoneNumber: representativeUnmaskedPhoneNumberRef?.current?.unmaskedValue,
      })
    }

    const data = {
      ...applicantFormData,
      birthDate: applicantBirthDate,
      phoneNumber: applicantUnmaskedPhoneNumberRef?.current?.unmaskedValue,
      representative,
      passportOriginal,
      russianPassport,
      educationDocumentOriginal,
      russianEducationDocument,
    }

    console.log(applicantBirthDate)
  }

  useEffect(() => {
    dispatch(getCountries())
  }, [dispatch])

  useEffect(() => {
    if (applicantPhoneNumberInputRef.current) {
      const mask = IMask(applicantPhoneNumberInputRef.current.input, maskOptions)
      applicantUnmaskedPhoneNumberRef.current = mask
    }
  }, [applicantPhoneNumberInputRef.current, maskOptions])

  useEffect(() => {
    if (representativePhoneNumberInputRef.current) {
      const mask = IMask(representativePhoneNumberInputRef.current.input, maskOptions)
      representativeUnmaskedPhoneNumberRef.current = mask
    }
  }, [representativePhoneNumberInputRef.current, maskOptions])

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
      <Form onFinish={onFinish} size='large' layout='vertical'>
        <Row gutter={[12, 12]}>
          <Col span={8}>
            <Form.Item name='name' label='Имя' required>
              <Input placeholder='Имя' className={formStyles.formInput} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name='surname' label='Фамилия' required>
              <Input placeholder='Фамилия' className={formStyles.formInput} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name='patronymic' label='Отчество' required>
              <Input placeholder='Отчество' className={formStyles.formInput} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[12, 12]}>
          <Col span={12}>
            <Form.Item name='birthDate' label='Дата рождения' required>
              <DatePicker
                placeholder='Дата рождения'
                className={formStyles.formInput}
                onChange={onApplicantBirthDateChange}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name='sex' label='Пол' required>
              <Select placeholder='Пол'>
                <Select.Option value='male'>Мужской</Select.Option>
                <Select.Option value='female'>Женский</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[12, 12]}>
          <Col span={12}>
            <Form.Item name='phoneNumber' label='Номер телефона' required>
              <Input
                placeholder='Номер телефона'
                ref={applicantPhoneNumberInputRef}
                // onChange={e => setApplicantUnmaskedPhoneNumber(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name='email' label='Электронная почта' required>
              <Input placeholder='Электронная почта' type='email' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={800}>
          <Col span={12}>
            <Form.Item name='registrationCountry' label='Страна регистрации' required>
              <Select
                showSearch
                options={countries.data}
                loading={countries.status === STATUS_DICT.PENDING}
                placeholder='Страна регистрации'
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name='livingCountry' label='Страна проживания' required>
              <Select
                showSearch
                options={countries.data}
                loading={countries.status === STATUS_DICT.PENDING}
                placeholder='Страна проживания'
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[12, 12]}>
          <Col span={12}>
            <Form.Item name='residenceVisaAvalibility' label='Виза на проживание в России' required>
              <Select placeholder='Наличие визы не указано'>
                <Select.Option value='hasVisa'>Есть виза на проживание</Select.Option>
                <Select.Option value='noVisa'>Нет визы на проживание</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name='preferredDirectionOfStudy' label='Профиль обучения' required>
              <Select placeholder='Профиль не выбран'>
                <Select.Option value='medical'>Медицинский</Select.Option>
                <Select.Option value='technical'>Инженерно-технический</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <Form.Item
              name='passportOriginal'
              label='Оригинал паспорта'
              layout='horizontal'
              valuePropName='file'
              required
            >
              <Upload
                beforeUpload={file => {
                  const isJPG = file.type === 'image/jpeg'
                  if (!isJPG) {
                    console.error('You can only upload JPG file!')
                  }
                  return false
                }}
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Загрузить</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name='russianPassport'
          label='Заверенный перевод паспорта на русский язык'
          layout='horizontal'
          valuePropName='file'
          required
        >
          <Upload
            beforeUpload={file => {
              const isJPG = file.type === 'image/jpeg'
              if (!isJPG) {
                console.error('You can only upload JPG file!')
              }
              return false
            }}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Загрузить</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name='educationDocumentOriginal'
          label='Документ об образовании'
          layout='horizontal'
          valuePropName='file'
          required
        >
          <Upload
            beforeUpload={file => {
              const isJPG = file.type === 'image/jpeg'
              if (!isJPG) {
                console.error('You can only upload JPG file!')
              }
              return false
            }}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Загрузить</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name='russianEducationDocument'
          label='Документ об образовании на русском языке'
          layout='horizontal'
          valuePropName='file'
          required
        >
          <Upload
            beforeUpload={file => {
              const isJPG = file.type === 'image/jpeg'
              if (!isJPG) {
                console.error('You can only upload JPG file!')
              }
              return false
            }}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Загрузить</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Form.Item name='dataProcessingAccept' valuePropName='checked' noStyle required>
            <Checkbox>Даю согласие на обработку данных</Checkbox>
          </Form.Item>
          <Form.Item name='isRepresentative' valuePropName='checked' onClick={onChecked}>
            <Checkbox>Являюсь представителем заявителя</Checkbox>
          </Form.Item>
        </Form.Item>
        {showRepresentative ? (
          <>
            <Row gutter={12}>
              <Col span={8}>
                <Form.Item name='representativeName' label='Имя представителя' required>
                  <Input placeholder='Имя представителя' className={formStyles.formInput} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name='representativeSurname' label='Фамилия представителя' required>
                  <Input placeholder='Фамилия представителя' className={formStyles.formInput} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name='representativePatronymic' label='Отчество представителя' required>
                  <Input placeholder='Отчество представителя' className={formStyles.formInput} />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name='representativePhoneNumber' label='Номер телефона представителя' required>
              <Input placeholder='Номер телефона представителя' ref={representativePhoneNumberInputRef} />
            </Form.Item>
            <Form.Item name='representativeEmail' label='Электронная почта представителя' required>
              <Input placeholder='Электронная почта представителя' type='email' />
            </Form.Item>
          </>
        ) : null}{' '}
        <Form.Item valuePropName='checked' required>
          <Button type='primary' htmlType='submit' style={{ margin: '0 auto' }}>
            Подать заявление
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default ApplicationForm

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

    console.log(data)
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
      console.log(mask)
      representativeUnmaskedPhoneNumberRef.current = mask
    }
  }, [showRepresentative, representativePhoneNumberInputRef.current, maskOptions])

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
        <Row gutter={100}>
          <Col span={12}>
            <Form.Item
              name='name'
              label='Имя'
              rules={[
                {
                  message: 'Имя должно быть строкой',
                  validator: (_, value) => {
                    if (
                      value &&
                      (/^[a-zA-Z]+$/.test(value) ||
                        /^[аАбБвВгГдДеЕёЁжЖзЗиИйЙкКлЛмМнНоОпПрРсСтТуУфФхХцЦчЧшШщЩъЪыЫьЬэЭюЮяЯ]+$/.test(value))
                    ) {
                      return Promise.resolve()
                    }
                    return Promise.reject()
                  },
                },
              ]}
              required
            >
              <Input placeholder='Имя' className={formStyles.formInput} />
            </Form.Item>
            <Form.Item
              name='surname'
              label='Фамилия'
              rules={[
                {
                  message: 'Фамилия должно быть строкой',
                  validator: (_, value) => {
                    if (
                      value &&
                      (/^[a-zA-Z]+$/.test(value) ||
                        /^[аАбБвВгГдДеЕёЁжЖзЗиИйЙкКлЛмМнНоОпПрРсСтТуУфФхХцЦчЧшШщЩъЪыЫьЬэЭюЮяЯ]+$/.test(value))
                    ) {
                      return Promise.resolve()
                    }
                    return Promise.reject()
                  },
                },
              ]}
              required
            >
              <Input placeholder='Фамилия' className={formStyles.formInput} />
            </Form.Item>
            <Form.Item
              name='patronymic'
              label='Отчество'
              rules={[
                {
                  message: 'Отчество должно быть строкой',
                  validator: (_, value) => {
                    if (
                      value &&
                      (/^[a-zA-Z]+$/.test(value) ||
                        /^[аАбБвВгГдДеЕёЁжЖзЗиИйЙкКлЛмМнНоОпПрРсСтТуУфФхХцЦчЧшШщЩъЪыЫьЬэЭюЮяЯ]+$/.test(value))
                    ) {
                      return Promise.resolve()
                    }
                    return Promise.reject()
                  },
                },
              ]}
              required
            >
              <Input placeholder='Отчество' className={formStyles.formInput} />
            </Form.Item>
            <Form.Item
              name='birthDate'
              label='Дата рождения'
              rules={[
                {
                  message: 'Дата рождения не указана',
                  required: true,
                },
              ]}
              required
            >
              <DatePicker
                placeholder='Дата рождения'
                className={formStyles.formInput}
                onChange={onApplicantBirthDateChange}
              />
            </Form.Item>

            <Form.Item
              name='phoneNumber'
              label='Номер телефона'
              rules={[
                {
                  message: 'Номер телефона должен состоять из 11 цифр',
                  validator: () => {
                    if (
                      /^\d+$/.test(applicantUnmaskedPhoneNumberRef.current.unmaskedValue) &&
                      applicantUnmaskedPhoneNumberRef.current.unmaskedValue.length === 11
                    ) {
                      return Promise.resolve()
                    }
                    return Promise.reject()
                  },
                },
              ]}
              required
            >
              <Input
                placeholder='Номер телефона'
                ref={applicantPhoneNumberInputRef}
                // onChange={e => setApplicantUnmaskedPhoneNumber(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name='email'
              label='Электронная почта'
              rules={[
                {
                  required: true,
                  message: 'Адрес электронной почты должен быть корректен',
                  type: 'email',
                },
              ]}
              required
            >
              <Input placeholder='Электронная почта' type='email' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='sex'
              label='Пол'
              rules={[
                {
                  required: true,
                  message: 'Пол не указан',
                },
              ]}
              required
            >
              <Select placeholder='Пол'>
                <Select.Option value='male'>Мужской</Select.Option>
                <Select.Option value='female'>Женский</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name='registrationCountry'
              label='Страна регистрации'
              rules={[
                {
                  required: true,
                  message: 'Страна регистрации не указана',
                },
              ]}
              required
            >
              <Select
                showSearch
                options={countries.data}
                loading={countries.status === STATUS_DICT.PENDING}
                placeholder='Страна регистрации'
              />
            </Form.Item>
            <Form.Item
              name='livingCountry'
              label='Страна проживания'
              rules={[
                {
                  required: true,
                  message: 'Страна проживания не указана',
                },
              ]}
              required
            >
              <Select
                showSearch
                options={countries.data}
                loading={countries.status === STATUS_DICT.PENDING}
                placeholder='Страна проживания'
              />
            </Form.Item>
            <Form.Item
              name='residenceVisaAvalibility'
              label='Виза на проживание в России'
              rules={[
                {
                  required: true,
                  message: 'Наличие визы на проживание в России не указано',
                },
              ]}
              required
            >
              <Select placeholder='Наличие визы не указано'>
                <Select.Option value='hasVisa'>Есть виза на проживание</Select.Option>
                <Select.Option value='noVisa'>Нет визы на проживание</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name='preferredDirectionOfStudy'
              label='Профиль обучения'
              rules={[
                {
                  required: true,
                  message: 'Профиль обучения не указан',
                },
              ]}
              required
            >
              <Select placeholder='Профиль не выбран'>
                <Select.Option value='medical'>Медицинский</Select.Option>
                <Select.Option value='technical'>Инженерно-технический</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={100}>
          <Col span={12}>
            <Form.Item
              name='passportOriginal'
              label='Оригинал паспорта'
              layout='horizontal'
              valuePropName='file'
              rules={[
                {
                  required: true,
                  message: 'Файл оригинала паспорта не загружен или имеет некорректный формат',
                },
              ]}
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
        <Row gutter={100}>
          <Col span={12}>
            <Form.Item
              name='russianPassport'
              label='Заверенный перевод паспорта на русский язык'
              layout='horizontal'
              valuePropName='file'
              rules={[
                {
                  required: true,
                  message:
                    'Файл заверенного перевода паспорта на русский язык не загружен или имеет некорректный формат',
                },
              ]}
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
        <Row gutter={100}>
          <Col span={12}>
            <Form.Item
              name='educationDocumentOriginal'
              label='Документ об образовании'
              layout='horizontal'
              valuePropName='file'
              rules={[
                {
                  required: true,
                  message: 'Файл документа об образовании не загружен или имеет некорректный формат',
                },
              ]}
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
        <Row gutter={100}>
          <Col span={12}>
            <Form.Item
              name='russianEducationDocument'
              label='Документ об образовании на русском языке'
              layout='horizontal'
              valuePropName='file'
              rules={[
                {
                  required: true,
                  message: 'Файл документа об образовании на русском языке или имеет некорректный формат',
                },
              ]}
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
        <Row gutter={100}>
          <Col span={12}>
            <Form.Item
              name='dataProcessingAccept'
              valuePropName='checked'
              rules={[
                {
                  message: 'Необходимо дать согласие на обработку данных',
                  validator: (_, value) => {
                    if (value) {
                      return Promise.resolve()
                    }
                    return Promise.reject()
                  },
                },
              ]}
              style={{ marginBottom: 0 }}
              required
            >
              <Checkbox>Даю согласие на обработку данных</Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={100}>
          <Col span={12}>
            <Form.Item name='isRepresentative' valuePropName='checked' style={{ marginBottom: 0 }} onClick={onChecked}>
              <Checkbox>Являюсь представителем заявителя</Checkbox>
            </Form.Item>
          </Col>
        </Row>
        {showRepresentative ? (
          <Row gutter={100}>
            <Col span={12}>
              <Form.Item
                name='representativeName'
                label='Имя представителя'
                rules={[
                  {
                    message: 'Имя представителя должно быть строкой',
                    validator: (_, value) => {
                      if (
                        value &&
                        (/^[a-zA-Z]+$/.test(value) ||
                          /^[аАбБвВгГдДеЕёЁжЖзЗиИйЙкКлЛмМнНоОпПрРсСтТуУфФхХцЦчЧшШщЩъЪыЫьЬэЭюЮяЯ]+$/.test(value))
                      ) {
                        return Promise.resolve()
                      }
                      return Promise.reject()
                    },
                  },
                ]}
                required
              >
                <Input placeholder='Имя представителя' className={formStyles.formInput} />
              </Form.Item>
              <Form.Item
                name='representativeSurname'
                label='Фамилия представителя'
                rules={[
                  {
                    message: 'Фамилия представителя должно быть строкой',
                    validator: (_, value) => {
                      if (
                        value &&
                        (/^[a-zA-Z]+$/.test(value) ||
                          /^[аАбБвВгГдДеЕёЁжЖзЗиИйЙкКлЛмМнНоОпПрРсСтТуУфФхХцЦчЧшШщЩъЪыЫьЬэЭюЮяЯ]+$/.test(value))
                      ) {
                        return Promise.resolve()
                      }
                      return Promise.reject()
                    },
                  },
                ]}
                required
              >
                <Input placeholder='Фамилия представителя' className={formStyles.formInput} />
              </Form.Item>
              <Form.Item
                name='representativePatronymic'
                label='Отчество представителя'
                rules={[
                  {
                    message: 'Отчество представителя должно быть строкой',
                    validator: (_, value) => {
                      if (
                        value &&
                        (/^[a-zA-Z]+$/.test(value) ||
                          /^[аАбБвВгГдДеЕёЁжЖзЗиИйЙкКлЛмМнНоОпПрРсСтТуУфФхХцЦчЧшШщЩъЪыЫьЬэЭюЮяЯ]+$/.test(value))
                      ) {
                        return Promise.resolve()
                      }
                      return Promise.reject()
                    },
                  },
                ]}
                required
              >
                <Input placeholder='Отчество представителя' className={formStyles.formInput} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='representativePhoneNumber'
                label='Номер телефона представителя'
                rules={[
                  {
                    message: 'Номер телефона представителя должен состоять из 11 цифр',
                    validator: (_, value) => {
                      if (
                        /^\d+$/.test(representativePhoneNumberInputRef.current.unmaskedValue) &&
                        representativePhoneNumberInputRef.current.unmaskedValue.length === 11
                      ) {
                        return Promise.resolve()
                      }
                      return Promise.reject()
                    },
                  },
                ]}
                required
              >
                <Input placeholder='Номер телефона представителя' ref={representativePhoneNumberInputRef} />
              </Form.Item>
              <Form.Item
                name='representativeEmail'
                label='Электронная почта представителя'
                rules={[
                  {
                    message: 'Адрес электронной почты представителя должен быть корректен',
                    type: 'email',
                    required: true,
                  },
                ]}
                required
              >
                <Input placeholder='Электронная почта представителя' type='email' />
              </Form.Item>
            </Col>
          </Row>
        ) : null}
        <Row gutter={100}>
          <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
            <Form.Item valuePropName='checked' required>
              <Button type='primary' htmlType='submit'>
                Подать заявление
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default ApplicationForm

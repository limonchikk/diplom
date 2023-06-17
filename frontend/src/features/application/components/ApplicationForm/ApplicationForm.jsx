import formStyles from './ApplicationForm.module.css'
import { Form, Input, Button, Select, DatePicker, Row, Col, Upload, Checkbox, notification, Space, Spin } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { STATUS_DICT } from '../../../../constants'
import { useSelector, useDispatch } from 'react-redux'
import { applyApplicationForm, getCountries, resetApplicationForm, sendApplicantQuestion } from '../../applicationSlice'
import applicationFormStyles from './ApplicationForm.module.css'

import moment from 'moment'

function ApplicationForm() {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const countries = useSelector(state => state.default.application.countries)
  const applicationFormResult = useSelector(state => state.default.application.applicationForm)
  const [applicantBirthDate, setApplicantBirthDate] = useState('')
  const [showRepresentative, setShowRepresentative] = useState(false)
  const [api, contextHolder] = notification.useNotification()

  const onFileLoaded = () => {
    api.info({
      message: `File successfuly uploaded!`,
      placement: 'bottomRight',
      duration: 2,
    })
  }

  const onApplicantBirthDateChange = (date, dateString) => {
    setApplicantBirthDate(dateString)
  }

  const onChecked = e => {
    if (e.target.checked) {
      return setShowRepresentative(true)
    }
    return setShowRepresentative(false)
  }

  const onFinish = async values => {
    const {
      passportOriginal,
      russianPassport,
      educationDocumentOriginal,
      russianEducationDocument,
      representativeName,
      representativeSurname,
      representativePatronymic,
      representativeEmail,
      isRepresentative,
      phoneNumber,
      representativePhoneNumber,
      ...applicantFormData
    } = values

    let representative = {}

    if (representativeEmail && representativePhoneNumber && isRepresentative) {
      Object.assign(representative, {
        name: representativeName.trim(),
        surname: representativeSurname.trim(),
        email: representativeEmail,
        phoneNumber: representativePhoneNumber,
      })
      if (representativePatronymic) {
        representative.patronymic = representativePatronymic.trim()
      }
    }

    const data = {
      ...applicantFormData,
      birthDate: applicantBirthDate,
      phoneNumber: phoneNumber,
      representative,
      passportOriginal: passportOriginal.file,
      russianPassport: russianPassport.file,
      educationDocumentOriginal: educationDocumentOriginal.file,
      russianEducationDocument: russianEducationDocument.file,
    }

    let notificationText = `${values.surname} ${values.name}. Номер телефона: ${phoneNumber}`

    if (representative.hasOwnProperty('name')) {
      notificationText = notificationText.concat(
        `\nПредставитель: ${representativeName.trim()} ${representativeSurname.trim()}. Номер телефона представителя: ${representativePhoneNumber}`
      )
    }

    dispatch(applyApplicationForm(data))
    dispatch(
      sendApplicantQuestion({
        type: 'application',
        text: notificationText,
        email: representativeEmail,
      })
    )
  }

  const dateFormatList = ['DD.MM.YYYY']

  useEffect(() => {
    if (applicationFormResult.status === STATUS_DICT.FINISHED) {
      if (applicationFormResult.data.errors) {
        api.error({
          message: `${applicationFormResult.data.errors.reduce((acc, e) => {
            return acc + e.message + '\n'
          }, '')}`,
          placement: 'topRight',
          duration: 5,
        })
      } else {
        api.success({
          message: `Application was successfuly sent!`,
          placement: 'bottomRight',
          duration: 2,
        })
      }

      dispatch(resetApplicationForm())
      form.resetFields()
    }
  }, [dispatch, applicationFormResult.status])

  useEffect(() => {
    dispatch(getCountries())
  }, [dispatch])

  return (
    <>
      {contextHolder}
      <div className={applicationFormStyles.heading}>
        <h2>Application form</h2>
        <p>Applications are accepted from July 1 to November 1</p>
        <h3>Note:</h3>
        <ul>
          <li>1. Application is submitted for paid education</li>
          <li>2. Applicant's age must be between 18 and 40 years old</li>
        </ul>
        <h4>Application for training</h4>
      </div>

      <Form onFinish={onFinish} size='large' layout='vertical' validateTrigger='onBlur' form={form}>
        <Row gutter={100}>
          <Col span={12}>
            <Form.Item
              name='surname'
              label='Surname'
              rules={[
                {
                  message: 'Surname should be a string',
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
              <Input placeholder='Surname' className={formStyles.formInput} />
            </Form.Item>
            <Form.Item
              name='name'
              label='Name'
              rules={[
                {
                  message: 'Name should be a string',
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
              <Input placeholder='Name' className={formStyles.formInput} />
            </Form.Item>

            <Form.Item name='patronymic' label='Patronymic (if available)'>
              <Input placeholder='Patronymic' className={formStyles.formInput} />
            </Form.Item>
            <Form.Item
              name='birthDate'
              label='Date of Birth'
              rules={[
                {
                  message: 'Date of Birth not specified',
                  validator: (_, value) => {
                    if (value) {
                      return Promise.resolve()
                    }
                    return Promise.reject()
                  },
                },
                {
                  message: 'Your age does not meet the requirements',
                  validator: (_, value) => {
                    let tmp = applicantBirthDate.split('.')

                    const momentApplicantBirthDate = moment(`${tmp[2]}-${tmp[1]}-${tmp[0]}`)
                    const strict40 = moment().subtract(40, 'years')
                    const isUnder40 = momentApplicantBirthDate.diff(strict40) >= 0

                    const strict18 = moment().subtract(18, 'years')
                    const isAbove18 = momentApplicantBirthDate.diff(strict18) <= 0

                    if (!value || (applicantBirthDate && isUnder40 && isAbove18)) {
                      return Promise.resolve()
                    }
                    return Promise.reject()
                  },
                },
              ]}
              required
            >
              <DatePicker
                format={dateFormatList}
                placeholder='Date of Birth'
                className={formStyles.formInput}
                onChange={onApplicantBirthDateChange}
                changeOnBlur={true}
              />
            </Form.Item>

            <Form.Item
              name='phoneNumber'
              label='Phone number'
              rules={[
                {
                  message: 'Enter the correct phone number',
                  validator: (_, value) => {
                    if (value && /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/.test(value)) {
                      return Promise.resolve()
                    }
                    return Promise.reject()
                  },
                },
              ]}
              required
            >
              <Input placeholder='Phone number' type='number' />
            </Form.Item>
            <Form.Item
              name='email'
              label='e-mail'
              rules={[
                {
                  required: true,
                  message: 'Enter the correct e-mail',
                  type: 'email',
                },
              ]}
              required
            >
              <Input placeholder='e-mail' type='email' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='sex'
              label='Gender'
              rules={[
                {
                  required: true,
                  message: 'Gender not specified',
                },
              ]}
              required
            >
              <Select placeholder='Gender'>
                <Select.Option value='male'>Male</Select.Option>
                <Select.Option value='female'>Female</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name='registrationCountry'
              label='Citizenship'
              rules={[
                {
                  required: true,
                  message: 'Citizenship not specified',
                },
              ]}
              required
            >
              <Select
                showSearch
                options={countries.data}
                loading={countries.status === STATUS_DICT.PENDING}
                placeholder='Citizenship'
              />
            </Form.Item>
            <Form.Item
              name='livingCountry'
              label='Residence country'
              rules={[
                {
                  required: true,
                  message: 'Residence country not specified',
                },
              ]}
              required
            >
              <Select
                showSearch
                options={countries.data}
                loading={countries.status === STATUS_DICT.PENDING}
                placeholder='Residence country'
              />
            </Form.Item>
            <Form.Item
              name='residenceVisaAvalibility'
              label='Russian visa'
              rules={[
                {
                  required: true,
                  message: 'Presence of Russian visa not specified',
                },
              ]}
              required
            >
              <Select placeholder='Presence of Russian visa not specified'>
                <Select.Option value={true}>I have a Russian visa</Select.Option>
                <Select.Option value={false}>I don’t have a Russian visa</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name='preferredDirectionOfStudy'
              label='Educational program'
              rules={[
                {
                  required: true,
                  message: 'Educational program not specified',
                },
              ]}
              required
            >
              <Select placeholder='Educational program not specified'>
                <Select.Option value='medical'>Medical</Select.Option>
                <Select.Option value='technical'>Engineering technical</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={100}>
          <Col span={12}>
            <Form.Item
              name='passportOriginal'
              label='Scan copy of passport '
              layout='horizontal'
              valuePropName='file'
              rules={[
                {
                  required: true,
                  message: 'The original passport file is not uploaded or is not in the correct format',
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
                accept='image/png, image/jpeg'
                onChange={info => {
                  if (info.file.size && info.fileList.length) {
                    onFileLoaded()
                  }
                }}
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={100}>
          <Col span={12}>
            <Form.Item
              name='russianPassport'
              label='Certified translation of the passport into Russian'
              layout='horizontal'
              valuePropName='file'
              rules={[
                {
                  required: true,
                  message:
                    'The file of the certified translation of the passport into Russian is not loaded or has an incorrect format',
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
                onChange={info => {
                  if (info.file.size && info.fileList.length) {
                    onFileLoaded()
                  }
                }}
                accept='image/png, image/jpeg'
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={100}>
          <Col span={12}>
            <Form.Item
              name='educationDocumentOriginal'
              label='Scan copy of completed education certificate'
              layout='horizontal'
              valuePropName='file'
              rules={[
                {
                  required: true,
                  message:
                    'Scan copy of completed education certificate is not uploaded or is not in the correct format',
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
                onChange={info => {
                  if (info.file.size && info.fileList.length) {
                    onFileLoaded()
                  }
                }}
                accept='image/png, image/jpeg'
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={100}>
          <Col span={12}>
            <Form.Item
              name='russianEducationDocument'
              label='Scan copy of completed education certificate in Russian'
              layout='horizontal'
              valuePropName='file'
              rules={[
                {
                  required: true,
                  message:
                    'Scan copy of completed education certificate in Russian is not uploaded or is not in the correct format',
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
                onChange={info => {
                  if (info.file.size && info.fileList.length) {
                    onFileLoaded()
                  }
                }}
                accept='image/png, image/jpeg'
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
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
                  message: 'Consent to data processing is required',
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
              <Checkbox>I agree to the processing of my personal data</Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={100}>
          <Col span={12}>
            <Form.Item name='isRepresentative' valuePropName='checked' style={{ marginBottom: 0 }} onClick={onChecked}>
              <Checkbox>I am the representative of the applicant</Checkbox>
            </Form.Item>
          </Col>
        </Row>
        {showRepresentative ? (
          <Row gutter={100}>
            <Col span={12}>
              <Form.Item
                name='representativeSurname'
                label='Representative surname'
                rules={[
                  {
                    message: 'Representative surname should be a string',
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
                <Input placeholder='Representative surname' className={formStyles.formInput} />
              </Form.Item>
              <Form.Item
                name='representativeName'
                label='Representative name'
                rules={[
                  {
                    message: 'Representative name should be a string',
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
                <Input placeholder='Representative name' className={formStyles.formInput} />
              </Form.Item>

              <Form.Item name='representativePatronymic' label='Representative patronymic (if available)'>
                <Input placeholder='Representative patronymic' className={formStyles.formInput} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='representativePhoneNumber'
                label='The phone number of Representative'
                rules={[
                  {
                    message: 'Enter the correct phone number of Representative',
                    validator: (_, value) => {
                      if (value && /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/.test(value)) {
                        return Promise.resolve()
                      }
                      return Promise.reject()
                    },
                  },
                ]}
                required
              >
                <Input placeholder='The phone number of Representative' type='number' />
              </Form.Item>
              <Form.Item
                name='representativeEmail'
                label='The e-mail of Representative'
                rules={[
                  {
                    message: 'The e-mail of Representative must be correct',
                    type: 'email',
                    required: true,
                  },
                ]}
                required
              >
                <Input placeholder='The e-mail of Representative' type='email' />
              </Form.Item>
            </Col>
          </Row>
        ) : null}
        <Row gutter={100}>
          <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
            <Form.Item valuePropName='checked' required>
              <Button
                type='primary'
                className={`btn ${formStyles.submitFormBtn}`}
                htmlType='submit'
                loading={applicationFormResult.status === STATUS_DICT.PENDING}
              >
                Apply
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default ApplicationForm

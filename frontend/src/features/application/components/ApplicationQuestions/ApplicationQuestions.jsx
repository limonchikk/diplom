import { Row, Col, Form, Input, Button, notification } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { STATUS_DICT } from '../../../../constants'
import { resetQuestion, sendApplicantQuestion } from '../../applicationSlice'
// import { useDispatch } from 'react-redux'
import css from './ApplicationQuestions.module.css'

const { TextArea } = Input

function ApplicationQuestions() {
  const [form] = Form.useForm()
  const { status, data } = useSelector(state => state.default.application.question)
  const dispatch = useDispatch()
  const [api, contextHolder] = notification.useNotification()

  const onFinish = async data => {
    dispatch(sendApplicantQuestion(data))
  }

  useEffect(() => {
    if (status === STATUS_DICT.FINISHED) {
      api.success({
        message: `Ваш вопрос успешно отправлен!`,
        placement: 'bottomRight',
        duration: 2,
      })
      dispatch(resetQuestion())
      form.resetFields()
    }
  }, [status, data])

  return (
    <>
      {contextHolder}
      <Row className={css.applicationQuestion}>
        <Col className={css.heading}>
          <h2> Часто задаваемые вопросы...</h2>
          <ul>
            <li>
              <b>Какой-то вопрос</b>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita soluta accusantium excepturi
                architecto! Rem praesentium qui aliquam obcaecati nulla tenetur architecto consequatur, odio recusandae
                accusamus maiores facilis? Et, exercitationem adipisci.
              </p>
            </li>
            <li>
              <b>Какой-то вопрос</b>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita soluta accusantium excepturi
                architecto! Rem praesentium qui aliquam obcaecati nulla tenetur architecto consequatur, odio recusandae
                accusamus maiores facilis? Et, exercitationem adipisci.
              </p>
            </li>
            <li>
              <b>Какой-то вопрос</b>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita soluta accusantium excepturi
                architecto! Rem praesentium qui aliquam obcaecati nulla tenetur architecto consequatur, odio recusandae
                accusamus maiores facilis? Et, exercitationem adipisci.
              </p>
            </li>
          </ul>
        </Col>
        <Col className={css.applicantQuestionFormBlock}>
          <Row>
            <Col span={20}>
              <p>
                Если у вас остались какие-то вопросы, вы можете задать их ниже. Для получения ответа необходимо указать
                адрес электронной почты
              </p>
              <Form size='large' layout='vertical' validateTrigger='onBlur' form={form} onFinish={onFinish}>
                <Form.Item
                  name='question'
                  rules={[
                    {
                      required: true,
                      message: 'Вопрос не может быть пустым',
                    },
                  ]}
                  required
                >
                  <TextArea
                    placeholder='Введите ваш вопрос...'
                    rows={4}
                    cols={6}
                    style={{ resize: 'none', padding: '20px 25px', height: '200px' }}
                  />
                </Form.Item>
                <Form.Item
                  name='email'
                  style={{ color: '#828282' }}
                  rules={[
                    {
                      required: true,
                      message: 'Адрес электронной почты должен быть корректен',
                      type: 'email',
                    },
                  ]}
                  required
                >
                  <Input placeholder='Ваш email' style={{ width: '260px', marginTop: '10px' }} />
                </Form.Item>
                <Form.Item valuePropName='checked' required>
                  <Button type='primary' className={`btn ${css.submitFormBtn}`} htmlType='submit'>
                    Отправить
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default ApplicationQuestions

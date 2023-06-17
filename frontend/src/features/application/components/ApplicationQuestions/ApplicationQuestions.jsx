import { Row, Col, Form, Input, Button, notification } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { STATUS_DICT } from '../../../../constants'
import { resetQuestion, sendApplicantQuestion } from '../../applicationSlice'
import css from './ApplicationQuestions.module.css'

const { TextArea } = Input

function ApplicationQuestions() {
  const [form] = Form.useForm()
  const { status, data } = useSelector(state => state.default.application.question)
  const dispatch = useDispatch()
  const [api, contextHolder] = notification.useNotification()

  const onFinish = async data => {
    dispatch(sendApplicantQuestion({ ...data, type: 'question' }))
  }

  useEffect(() => {
    if (status === STATUS_DICT.FINISHED) {
      api.success({
        message: `Your question was successfuly sent!`,
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
      <Row className={css.applicationQuestion} style={{ display: 'flex', flexDirection: 'column' }}>
        <Col className={css.heading}>
          <h2>Frequently asked questions</h2>
          <ul className={css.mainList}>
            <li className={css.mainListItem}>
              <b className={css.question}>What documents are required for admission to the Preparatory department?</b>
              <ul className={css.questionList}>
                <li>Application</li>
                <li>Notarized copy of the passport and translation into Russian</li>
                <li>
                  Notarized copy of the document on education, translation into Russian of this document and its annexes
                </li>
                <li>Presence of consular legalization and apostille on documents</li>
              </ul>
            </li>
            <li className={css.mainListItem}>
              <b>
                Is it possible to continue education in the universities of the Russian Federation after completing the
                training in the Preparatory department?
              </b>
              <p>Upon completion of training, a state certificate is issued</p>
            </li>
            <li className={css.mainListItem}>
              <b>What is the form of education?</b>
              <p>Full-time, remote using e-learning, distance learning technologies</p>
            </li>

            <li className={css.mainListItem}>
              <b>What are the educational programs (obligatory subjects)?</b>
              <ul className={css.questionList}>
                <li>Biomedical (Russian, chemistry, biology, physics)</li>
                <li>Natural sciences (Russian, physics, chemistry, mathematics)</li>
              </ul>
            </li>

            <li className={css.mainListItem}>
              <b>How long does the training last?</b>
              <p>Training starts on October 1st and ends on June 20th.</p>
            </li>

            <li className={css.mainListItem}>
              <b>Tuition fee?</b>
              <p>153 000 rubles.</p>
            </li>

            <li className={css.mainListItem}>
              <b>Can I pay by semester?</b>
              <p>It is possible to pay for each semester.</p>
            </li>

            <li className={css.mainListItem}>
              <b>How is the accommodation issue resolved?</b>
              <ul className={css.questionList}>
                <li>A student of the Preparatory department may be provided with a hostel.</li>
                <li>The hostel is paid. Payment is made monthly.</li>
              </ul>
            </li>

            <li className={css.mainListItem}>
              <b>How to issue an invitation and a visa?</b>
              <p>To issue an invitation, you need:</p>
              <ul className={css.questionList}>
                <li>notarized copies of the passport and translation into Russian</li>
                <li>education document</li>
                <li>copy of the training contract</li>
                <li>tuition payment receipt</li>
              </ul>
              <p>
                After the submission of the above documents, a single entry student visa is issued for a period of 3
                months.
              </p>
            </li>

            <li className={css.mainListItem}>
              <b>How can I extend the visa?</b>
              <p>
                After the arrival of a foreign student in the country, upon submission of the necessary documents, a
                multiple-entry visa is issued for the entire period of study at the Preparatory department.
              </p>
            </li>
          </ul>
          <br />
          <p style={{ color: '#000' }}>
            In general, while studying at the Preparatory department, students attend a variety of cultural and sports
            events, which is an excellent addition to gaining knowledge and getting to know the rich Russian language
            and culture.
          </p>
        </Col>
        <Col className={css.applicantQuestionFormBlock}>
          <Row>
            <Col span={20}>
              <br></br>
              <p>
                If you have any questions, you can ask them below. To receive a response, you must provide your E-mail.
              </p>
              <br />
              <Form size='large' layout='vertical' validateTrigger='onBlur' form={form} onFinish={onFinish}>
                <Form.Item
                  name='text'
                  rules={[
                    {
                      required: true,
                      message: 'The question can’t be empty',
                    },
                  ]}
                  required
                >
                  <TextArea
                    placeholder='Enter your question'
                    rows={4}
                    cols={6}
                    style={{ resize: 'none', padding: '20px 25px', height: '140px' }}
                  />
                </Form.Item>
                <Form.Item
                  name='email'
                  style={{ color: '#828282' }}
                  rules={[
                    {
                      required: true,
                      message: 'Enter the correct e-mail',
                      type: 'email',
                    },
                  ]}
                  required
                >
                  <Input placeholder='Your e-mail' style={{ width: '260px', marginTop: '10px' }} />
                </Form.Item>
                <Form.Item valuePropName='checked' required>
                  <Button
                    type='primary'
                    className={`btn ${css.submitFormBtn}`}
                    style={{ minWidth: '130px' }}
                    htmlType='submit'
                  >
                    Send
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

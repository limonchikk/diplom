import { Row, Col, Collapse, Descriptions, Button, Checkbox } from 'antd'
import css from './NewApplicationCart.module.css'
import { useEffect, useState } from 'react'
import { getApplications, resetApplications, updateApplication } from '../../../application/applicationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { STATUS_DICT } from '../../../../constants'
import { fetchDocuments } from '../../../../api/application'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import moment from 'moment'

const { Panel } = Collapse

function NewApplicationCart({ count }) {
  const { status, data } = useSelector(state => state.default.application.applications)
  const [state, setState] = useState({ data: [] })
  const dispatch = useDispatch()
  const [loadings, setLoadings] = useState([])
  const application = useSelector(state => state.default.application.application)

  const onChangeViewed = (application, viewed) => {
    dispatch(updateApplication({ id: application.applicationId, viewed: viewed }))
  }

  useEffect(() => {
    if (application.status === STATUS_DICT.FINISHED) {
      dispatch(getApplications({ viewed: false }))
    }
  }, [application.data, application.status])

  const downloadDocs = async (documents, idx, applicantFio, docType) => {
    setLoadings(prevLoadings => {
      const newLoadings = [...prevLoadings]
      newLoadings[idx] = true
      return newLoadings
    })

    const zip = new JSZip()

    const docsData = await fetchDocuments(zip, documents)

    const docByType = docsData.find(d => d.type === docType)

    zip.file(docByType.fileName, docByType.data)

    zip.generateAsync({ type: 'blob' }).then(function (blob) {
      saveAs(blob, `${applicantFio}_${docByType.type}.zip`)
    })

    setTimeout(() => {
      setLoadings(prevLoadings => {
        const newLoadings = [...prevLoadings]
        newLoadings[idx] = false
        return newLoadings
      })
    }, 1000)
  }

  useEffect(() => {
    if (status === STATUS_DICT.FINISHED) {
      setState(prevState => ({ ...prevState, data: data.applications.filter(e => !e.viewed) }))
      count(data.applications.filter(e => !e.viewed).length)
    }
  }, [data, status])

  useEffect(() => {
    dispatch(getApplications({ viewed: false }))
    return () => dispatch(resetApplications())
  }, [dispatch])

  return (
    <Row gutter={90} style={{ paddingBottom: '20px' }}>
      <Col span={24}>
        {state.data.map((application, id) => (
          <Collapse key={application.applicationId} className={css.collapse}>
            <Panel header={application.applicantFio} className={css.collapseHeader}>
              <Row gutter={60}>
                <Col span={12}>
                  <Descriptions layout='left' column={1} bordered size='small' className={css.newApplicationTable}>
                    <Descriptions.Item label='Дата рождения'>
                      {moment(application.applicantBirthDate).subtract(10, 'days').format('DD.MM.YYYY')}
                    </Descriptions.Item>
                    <Descriptions.Item label='Пол'>
                      {application.applicantSex === 'male' ? 'мужской' : 'женский'}
                    </Descriptions.Item>
                    <Descriptions.Item label='Страна регистрации'>
                      {application.applicantRegistrationCountry}
                    </Descriptions.Item>
                    <Descriptions.Item label='Страна проживания'>
                      {application.applicantLivingCountry}
                    </Descriptions.Item>
                    <Descriptions.Item label='Виза'>
                      {application.applicantResidenceVisaAvalibility ? 'да' : 'нет'}
                    </Descriptions.Item>
                    <Descriptions.Item label='Направление обучения'>
                      {application.applicantPreferredDirectionOfStudy === 'medical'
                        ? 'Медицинское'
                        : 'Инженерно-техническое'}
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
                <Col span={12}>
                  <Descriptions layout='right' column={1} bordered size='small' className={css.newApplicationTable}>
                    <Descriptions.Item label='Почта'>{application.applicantEmail}</Descriptions.Item>
                    <Descriptions.Item label='Паспорт'>
                      <Button
                        type='link'
                        loading={loadings[0]}
                        onClick={() =>
                          downloadDocs(application.documents, 0, application.applicantFio.trim(), 'passport_original')
                        }
                      >
                        Скачать
                      </Button>
                    </Descriptions.Item>
                    <Descriptions.Item label='Паспорт на русском'>
                      <Button
                        type='link'
                        loading={loadings[1]}
                        onClick={() =>
                          downloadDocs(application.documents, 1, application.applicantFio.trim(), 'russian_passport')
                        }
                      >
                        Скачать
                      </Button>
                    </Descriptions.Item>
                    <Descriptions.Item label='Документ об обр.'>
                      <Button
                        type='link'
                        loading={loadings[2]}
                        onClick={() =>
                          downloadDocs(
                            application.documents,
                            2,
                            application.applicantFio.trim(),
                            'education_document_original'
                          )
                        }
                      >
                        Скачать
                      </Button>
                    </Descriptions.Item>
                    <Descriptions.Item label='Документ об обр. на рус.'>
                      <Button
                        type='link'
                        loading={loadings[3]}
                        onClick={() =>
                          downloadDocs(
                            application.documents,
                            3,
                            application.applicantFio.trim(),
                            'russian_education_document'
                          )
                        }
                      >
                        Скачать
                      </Button>
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
              </Row>

              <Row gutter={60} style={{ paddingTop: '15px' }}>
                <Col style={{ width: '85%' }}>
                  <p>
                    <b>Представитель: </b>
                    {application.representative
                      ? `${application.representative.surname} ${application.representative.name} ${
                          application.representative.patronymic ?? ''
                        }, ${application.representative.email}, ${application.representative.phoneNumber}`
                      : 'отсутствует'}
                  </p>
                  <br />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <p>Дата подачи заявления: {moment(application.createdAt).local().format('DD.MM.YYYY, LT')}</p>
                    </div>
                  </div>
                </Col>
                <Col style={{ width: '15%', display: 'flex', alignItems: 'end', justifyContent: 'end' }}>
                  <div className={css.viewedWrapper}>
                    Просмотрена&nbsp;&nbsp;
                    <Checkbox
                      onChange={e => onChangeViewed(application, e.target.checked)}
                      className={css.viewed}
                    ></Checkbox>
                  </div>
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

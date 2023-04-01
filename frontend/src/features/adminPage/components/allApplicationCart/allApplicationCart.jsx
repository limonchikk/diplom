import { Button, Table, Typography } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { getApplications, getDocuments, resetApplications } from '../../../application/applicationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { STATUS_DICT } from '../../../../constants'
import css from './AllApplicationCart.module.css'
import moment from 'moment'
import 'moment/locale/ru'
import { fetchDocuments } from '../../../../api/application'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

const zip = new JSZip()

moment.locale()

function AllApplicationCart() {
  const { status, data } = useSelector(state => state.default.application.applications)
  // const documentsRaw = useSelector(state => state.default.application.documents)
  const [state, setState] = useState({ data: [] })
  const [docs, setDocs] = useState([])
  const [loadings, setLoadings] = useState([])
  const dispatch = useDispatch()

  const downloadDocs = async (documents, idx, applicantFio) => {
    setLoadings(prevLoadings => {
      const newLoadings = [...prevLoadings]
      newLoadings[idx] = true
      return newLoadings
    })

    const zip = new JSZip()

    const docs = await fetchDocuments(zip, documents)

    zip.generateAsync({ type: 'blob' }).then(function (blob) {
      saveAs(blob, `${applicantFio}.zip`)
    })

    // for (let doc of documents) {
    //   let a = `http://localhost:3000${doc.documentId}`
    //   a.click()
    // }

    // dispatch(getDocuments(documents))

    setTimeout(() => {
      setLoadings(prevLoadings => {
        const newLoadings = [...prevLoadings]
        newLoadings[idx] = false
        return newLoadings
      })
    }, 1000)
  }

  // useEffect(() => {
  //   if (documentsRaw.status === STATUS_DICT.FINISHED) {
  //     setDocs(documentsRaw.data)

  //     console.log('zz')
  //     const url = window.URL.createObjectURL(new Blob([documentsRaw.data[0]]))
  //     console.log(url)
  //     const link = document.createElement('a')
  //     link.href = url
  //     link.setAttribute('download', `FileName.png`)

  //     // Append to html link element page
  //     document.body.appendChild(link)

  //     // Start download
  //     link.click()

  //     // Clean up and remove the link
  //     link.parentNode.removeChild(link)
  //   }
  // }, [documentsRaw.data, documentsRaw.status])

  const tableColumns = [
    {
      title: 'ФИО',
      dataIndex: 'applicantFio',
    },
    {
      title: 'Дата рождения',
      dataIndex: 'applicantBirthDate',
    },
    {
      title: 'Пол',
      dataIndex: 'applicantSex',
    },
    {
      title: 'Регистрация',
      dataIndex: 'applicantRegistrationCountry',
    },
    {
      title: 'Проживание',
      dataIndex: 'applicantLivingCountry',
    },
    {
      title: 'Виза',
      dataIndex: 'applicantResidenceVisaAvalibility',
    },
    {
      title: 'Направление',
      dataIndex: 'applicantPreferredDirectionOfStudy',
    },
    {
      title: 'Телефон',
      dataIndex: 'applicantPhoneNumber',
    },
    {
      title: 'Почта',
      dataIndex: 'applicantEmail',
    },
    {
      title: 'Дата подачи',
      dataIndex: 'createdAt',
    },
    {
      title: 'Документы',
      dataIndex: 'documents',
      fixed: 'right',
    },
  ].map(e => ({
    ...e,
    key: e.dataIndex,
    ellipsis: false,
    align: 'center',
    colSpan: 1,
    style: { fontSize: '12px', fontWeight: '300' },
    className: css.test,
  }))

  const mapTableData = (application, idx) => {
    return {
      key: application.applicationId,
      applicantFio: application.applicantFio.trim(),
      applicantBirthDate: moment(application.applicantBirthDate).subtract(10, 'days').format('DD.MM.YYYY'),
      applicantSex: application.applicantSex === 'male' ? 'мужской' : 'женский',
      applicantRegistrationCountry: application.applicantRegistrationCountry,
      applicantLivingCountry: application.applicantLivingCountry,
      applicantResidenceVisaAvalibility: application.applicantResidenceVisaAvalibility ? 'да' : 'нет',
      applicantPreferredDirectionOfStudy:
        application.applicantPreferredDirectionOfStudy === 'medical' ? 'Медицинское' : 'Инженерно-техническое',
      applicantPhoneNumber: application.applicantPhoneNumber,
      applicantEmail: application.applicantEmail,
      createdAt: moment(application.createdAt).subtract(10, 'days').format('LT, DD.MM.YYYY'),
      documents: (
        <Button
          type='link'
          loading={loadings[0]}
          onClick={() => downloadDocs(application.documents, idx, application.applicantFio.trim())}
        >
          Скачать
        </Button>
      ),
    }
  }

  useEffect(() => {
    if (status === STATUS_DICT.FINISHED) {
      setState(prevState => ({ ...prevState, data: data.applications }))
    }
  }, [data, status])

  useEffect(() => {
    dispatch(getApplications())
    return () => dispatch(resetApplications())
  }, [dispatch])

  return (
    <Table
      columns={tableColumns}
      dataSource={state.data.map(mapTableData)}
      pagination={false}
      size='default'
      style={{ textAlign: 'center', width: '100%' }}
      bordered={true}
      scroll={{ x: 'max-content' }}
    />
  )
}

export default AllApplicationCart

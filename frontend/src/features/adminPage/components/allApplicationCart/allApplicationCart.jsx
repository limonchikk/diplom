import { Button, Table, Input, Cascader, Checkbox, Spin, Select } from 'antd'
import { useEffect, useState } from 'react'
import { getApplications, resetApplications } from '../../../application/applicationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { STATUS_DICT } from '../../../../constants'
import css from './AllApplicationCart.module.css'
import moment from 'moment'
import 'moment/locale/ru'
import { fetchDocuments } from '../../../../api/application'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

moment.locale()

function AllApplicationCart() {
  const { status, data } = useSelector(state => state.default.application.applications)
  const [state, setState] = useState({ data: [], searchData: [] })
  const [loadings, setLoadings] = useState([])
  let [active, setActive] = useState('spin')
  const dispatch = useDispatch()

  const searchOptions = [
    {
      value: 'applicantFio',
      label: 'ФИО',
    },
    {
      value: 'applicantRegistrationCountry',
      label: 'Регистрация',
    },
    {
      value: 'applicantLivingCountry',
      label: 'Проживание',
    },
    {
      value: 'applicantPhoneNumber',
      label: 'Телефон',
    },
    {
      value: 'applicantEmail',
      label: 'Почта',
    },
    {
      value: 'applicantPreferredDirectionOfStudy',
      label: 'Направление',
    },
  ]

  const [search, setSearch] = useState({ field: [searchOptions[0].value], text: '' })
  const [showRepresentative, setShowRepresentative] = useState(false)

  const representative = s => {
    setShowRepresentative(s)
  }

  const updateTableRows = () => {
    const { field, text } = search

    if (text && field && field.length) {
      setState({
        ...state,
        searchData: state.data.filter(ap => {
          let value = ap[field[0]]
          if (field[0] === 'applicantPreferredDirectionOfStudy') {
            if (value === 'medical') {
              value = 'Медицинское'
            } else {
              value = 'Инженерно-техническое'
            }
          }

          if (value.match(new RegExp(`^${text}`, 'i'))) {
            return true
          }
          return false
        }),
      })
      return
    }

    dispatch(getApplications())
  }

  const downloadDocs = async (documents, idx, applicantFio) => {
    setLoadings(prevLoadings => {
      const newLoadings = [...prevLoadings]
      newLoadings[idx] = true
      return newLoadings
    })

    const zip = new JSZip()

    const docsData = await fetchDocuments(zip, documents)

    docsData.forEach(d => {
      zip.file(d.fileName, d.data)
    })

    zip.generateAsync({ type: 'blob' }).then(function (blob) {
      saveAs(blob, `${applicantFio}.zip`)
    })

    setTimeout(() => {
      setLoadings(prevLoadings => {
        const newLoadings = [...prevLoadings]
        newLoadings[idx] = false
        return newLoadings
      })
    }, 1000)
  }

  const tableColumProps = (e, idx) => {
    let style = { fontSize: '12px', fontWeight: '300' }
    if (idx % 2 === 0) {
      Object.assign(style, { backgroundColor: '#CBD7F0' })
    } else {
      Object.assign(style, { backgroundColor: '#FFF' })
    }
    return {
      ...e,
      key: e.dataIndex,
      ellipsis: false,
      align: 'center',
      colSpan: 1,
      style,
      className: css.test,
    }
  }

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
  ]

  const getTableCols = showR => {
    if (!showR) {
      const res = tableColumns.map((e, idx) => {
        return tableColumProps(e, idx)
      })
      return res
    }

    const copy = [...tableColumns]

    copy.splice(1, 0, { title: 'Представитель', dataIndex: 'representative' })
    const res = copy.map((e, idx) => {
      return tableColumProps(e, idx)
    })
    return res
  }

  const mapTableData = (application, idx) => {
    return {
      key: application.applicationId,
      applicantFio: application.applicantFio.trim(),
      representative: application.representative
        ? `${application.representative.name} ${application.representative.surname} ${
            application.representative.patronymic ?? ''
          }
        ${application.representative.phoneNumber}
        ${application.representative.email}`
        : 'нет',
      applicantBirthDate: moment(application.applicantBirthDate).subtract(10, 'days').format('DD.MM.YYYY'),
      applicantSex: application.applicantSex === 'male' ? 'мужской' : 'женский',
      applicantRegistrationCountry: application.applicantRegistrationCountry,
      applicantLivingCountry: application.applicantLivingCountry,
      applicantResidenceVisaAvalibility: application.applicantResidenceVisaAvalibility ? 'да' : 'нет',
      applicantPreferredDirectionOfStudy:
        application.applicantPreferredDirectionOfStudy === 'medical' ? 'Медицинское' : 'Инженерно-техническое',
      applicantPhoneNumber: application.applicantPhoneNumber,
      applicantEmail: application.applicantEmail,
      createdAt: moment(application.createdAt).local().format('DD.MM.YYYY, LT'),
      documents: (
        <Button
          type='link'
          loading={loadings[idx]}
          onClick={() => downloadDocs(application.documents, idx, application.applicantFio.trim())}
        >
          Скачать
        </Button>
      ),
    }
  }

  useEffect(() => {
    if (status === STATUS_DICT.FINISHED) {
      setState(prevState => ({ ...prevState, data: data.applications, searchData: data.applications }))
    }
  }, [data, status])

  useEffect(() => {
    dispatch(getApplications())
    return () => dispatch(resetApplications())
  }, [dispatch])

  return (
    <>
      <Input
        addonAfter={
          <Cascader
            placeholder='Поле поиска'
            className={css.cascader}
            options={searchOptions}
            size='large'
            style={{ textAlign: 'center' }}
            value={search.field}
            onChange={e => {
              return setSearch({ ...search, field: e })
            }}
            onBlur={updateTableRows}
          />
        }
        size='large'
        value={search.text}
        onChange={e => setSearch({ ...search, text: e.target.value })}
        onBlur={updateTableRows}
      />
      <Checkbox
        style={{ paddingTop: '25px', paddingBottom: '25px' }}
        onChange={e => representative(e.target.checked)}
        className={css.rep}
      >
        Показать представителей
      </Checkbox>
      <div>
        <Spin className={active === '' ? css.active : null} style={{ display: 'none' }} />
        <Table
          columns={getTableCols(showRepresentative)}
          dataSource={state.searchData.map(mapTableData)}
          pagination={false}
          size='default'
          style={{
            textAlign: 'center',
            width: '100%',
            whiteSpace: 'pre-line',
          }}
          bordered={false}
          scroll={{ x: 'max-content' }}
          className={css.allApplicationTable}
          loading={status === STATUS_DICT.PENDING}
        />
      </div>
    </>
  )
}

export default AllApplicationCart

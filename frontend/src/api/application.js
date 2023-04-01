import { axiosInstance } from '.'

export const fetchCountries = () =>
  axiosInstance
    .get('https://namaztimes.kz/ru/api/country?type=json')
    .then(res => Object.values(res.data).map(it => ({ value: it, label: it })))

export const fetchApplyApplicationForm = data => {
  return axiosInstance
    .post('http://localhost:3001/api/applications', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(res => res.data.id)
}

export const fetchApplications = params =>
  axiosInstance.get('http://localhost:3001/api/applications', { params }).then(res => {
    return res.data
  })

export const fetchDocuments = (zip, params) => {
  return Promise.all(
    params.map(doc => {
      return axiosInstance
        .get('http://localhost:3001/api/documents', {
          params: { id: doc.documentId },
          responseType: 'blob',
        })
        .then(res => {
          let contentDisposition = res.headers['content-disposition']
          const fileName = contentDisposition.split('filename=')[1].split(';')[0]
          zip.file(fileName, res.data)
        })
    })
  )
}

export const sendQuestion = data => {
  return axiosInstance.post('http://localhost:3001/api/notifications/sendMail', data).then(res => res.data.id)
}

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
  console.log(123)
  console.log(params)
  console.log(321)
  return Promise.all(
    params.map(doc => {
      return axiosInstance
        .get('http://localhost:3001/api/documents', {
          params: { id: doc.documentId },
          // headers: { 'Content-Type': 'application/octet-stream' },
          responseType: 'blob',
        })
        .then(res => {
          let contentDisposition = res.headers['content-disposition']
          const fileName = contentDisposition.split('filename=')[1].split(';')[0]
          zip.file(fileName, res.data)
          // let url = window.URL.createObjectURL(res.data)
          // let link = document.createElement('a')
          // link.href = url
          // link.setAttribute('download', contentDisposition.split('filename=')[1].split(';')[0])

          // return { fileName: contentDisposition.split('filename=')[1].split(';')[0], file: res.data }

          //  document.body.append(link)
          // link.click()
          // return {}
        })
    })
  )
}

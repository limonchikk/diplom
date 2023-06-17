import { axiosInstance } from '.'
import { baseUrl } from '../constants'

import countries from './countries.json'

export const fetchCountries = () => {
  return countries.map(e => ({ value: e.Name, label: e.Name }))
}

export const fetchStatistics = params =>
  axiosInstance.get(`${baseUrl}/api/applications/statistics`, { params }).then(res => res.data.bars)

export const fetchApplyApplicationForm = data => {
  return axiosInstance
    .post(`${baseUrl}/api/applications`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(res => res.data.id)
    .catch(err => {
      if (err.response) {
        return err.response.data
      }

      return { errors: [{ message: 'Сервер не отвечает' }] }
    })
}

export const updateApplicationData = data => {
  return axiosInstance.post(`${baseUrl}/api/applications/update`, data).then(res => res.data)
}

export const fetchApplications = params =>
  axiosInstance.get(`${baseUrl}/api/applications`, { params }).then(res => {
    return res.data
  })

export const fetchDocuments = (zip, params) => {
  return Promise.all(
    params.map(doc => {
      return axiosInstance
        .get(`${baseUrl}/api/documents`, {
          params: { id: doc.documentId },
          responseType: 'blob',
        })
        .then(res => {
          let contentDisposition = res.headers['content-disposition']
          const fileName = contentDisposition.split('filename=')[1].split(';')[0]
          return { fileName, data: res.data, type: fileName.split('.')[0] }
        })
    })
  )
}

export const sendQuestion = data => {
  return axiosInstance.post(`${baseUrl}/api/notifications/sendMail`, data).then(res => res.data.id)
}

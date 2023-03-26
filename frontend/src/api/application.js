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

import axios from 'axios'

export const fetchCountries = () =>
  axios
    .get('https://namaztimes.kz/ru/api/country?type=json')
    .then(res => Object.values(res.data).map(it => ({ value: it, label: it })))

export const fetchApplyApplicationForm = data => {
  return axios
    .post('http://localhost:3001/api/applications', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(res => res.data.id)
}

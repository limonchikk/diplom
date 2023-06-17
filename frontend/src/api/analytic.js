import { axiosInstance } from '.'

export const fetchStatistics = () =>
  axiosInstance
    .get('https://namaztimes.kz/ru/api/country?type=json')
    .then(res => Object.values(res.data).map(it => ({ value: it, label: it })))

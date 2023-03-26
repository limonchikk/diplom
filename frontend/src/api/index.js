import axios from 'axios'

export const axiosInstance = axios.create({})

axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token')
    if (token && config.url !== 'https://namaztimes.kz/ru/api/country?type=json') {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

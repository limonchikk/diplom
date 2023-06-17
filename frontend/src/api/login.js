import { axiosInstance } from '.'
import { baseUrl } from '../constants'

export const fetchJwtToken = data => {
  return axiosInstance.post(`${baseUrl}/api/auth/signin`, data).then(res => {
    if (res.data.accessToken) {
      localStorage.setItem('token', res.data.accessToken)
    }
    return res.data
  })
}

import { axiosInstance } from '.'

export const fetchJwtToken = data => {
  return axiosInstance.post('http://localhost:3001/api/auth/signin', data).then(res => {
    if (res.data.accessToken) {
      localStorage.setItem('token', res.data.accessToken)
    }
    return res.data.accessToken
  })
}

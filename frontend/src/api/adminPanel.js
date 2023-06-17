import { axiosInstance } from '.'
import { baseUrl } from '../constants'

export const updateAdminData = data => {
  return axiosInstance.put(`${baseUrl}/api/users`, data).then(res => {
    return res.data
  })
}

export const fetchAdminData = token =>
  axiosInstance.get(`${baseUrl}/api/users/me`).then(res => {
    return res.data
  })

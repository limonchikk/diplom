import { axiosInstance } from '.'

export const updateAdminData = data => {
  return axiosInstance.put('http://localhost:3001/api/users', data).then(res => {
    return res.data
  })
}

export const fetchAdminData = token =>
  axiosInstance.get('http://localhost:3001/api/users/me').then(res => {
    return res.data
  })

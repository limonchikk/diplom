import Application from '../pages/application/Application'
import Login from '../pages/login/Login'

export const PATH_DICT = {
  ROOT: '*',
  LOGIN: '/login',
}

export const routes = [
  {
    path: PATH_DICT.ROOT,
    element: <Application />,
  },
  {
    path: PATH_DICT.LOGIN,
    element: <Login />,
  },
]

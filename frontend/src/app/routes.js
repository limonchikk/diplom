import AdminPanel from '../pages/admin-panel/AdminPanel'
import Application from '../pages/application/Application'
import Login from '../pages/login/Login'

export const PATH_DICT = {
  ROOT: '/',
  LOGIN: '/login',
  ADMIN_PANEL: '/admin-panel',
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
  {
    path: PATH_DICT.ADMIN_PANEL,
    element: <AdminPanel />,
  },
]

import React from 'react'
import Header from '../components/header/Header'
import '../styles/App.css'
import { AppRouter } from './AppRouter'
import { Provider } from 'react-redux'
import store from '../store/store'
import { useLocation } from 'react-router-dom'
import { PATH_DICT } from './routes'
import css from './App.module.css'

function App() {
  let { pathname } = useLocation()

  let showHeaderPaths = [PATH_DICT.LOGIN, PATH_DICT.ADMIN_PANEL]

  return (
    <div className={css.app}>
      <Provider store={store}>
        {!showHeaderPaths.some(e => e === pathname) && <Header />}
        <AppRouter />
      </Provider>
    </div>
  )
}

export default App

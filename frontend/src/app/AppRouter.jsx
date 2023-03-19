import { Routes, Route } from 'react-router-dom'
import { routes } from './routes'

export const AppRouter = () => {
  return (
    <Routes>
      {routes.map(it => (
        <Route key={it.path} {...it} />
      ))}
    </Routes>
  )
}

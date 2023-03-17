import React from 'react'
import Header from './components/header/Header'
import './styles/App.css'
import { Routes, Route } from 'react-router-dom'
import Application from './pages/application/Application'

function App() {
  return (
    <div className='App'>
      <Header />

      <Routes className='main'>
        <Route path='*' element={<Application />} />
      </Routes>
    </div>
  )
}

export default App

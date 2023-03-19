import React from 'react'
import Header from '../components/header/Header'
import '../styles/App.css'
import {AppRouter} from "./AppRouter";
import {Provider} from "react-redux";
import store from "../store/store";

function App() {
  return (
    <div className='App'>
        <Provider store={store}>
            <Header />
            <AppRouter />
        </Provider>
    </div>
  )
}

export default App

import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import SignInandSign from './components/SignInandSignup'
import HomePage from './pages/HomePage'
import Notfound from './pages/Notfound'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path="/signup" element={<SignInandSign type="signup"/>} />
      <Route path="/signin" element={<SignInandSign type="signin"/>} />
      <Route path='*' element={<Notfound/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App

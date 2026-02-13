import { Routes, Route } from 'react-router-dom'
import './App.css'
import Signup from './Pages/Signup'
import Signin from './Pages/Signin'
import Navbar from './Components/Navbar'
import Dashboard from './Pages/Dashboard'

import Home from './Pages/home'

function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App

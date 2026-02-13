import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Signup = () => {
  const [Name, setName] = useState("")
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [Loading, setLoading] = useState(false)
  const [Response, setResponse] = useState("");
  //   const navigate = useNavigate()  

  const HandleSignup = async () => {
    console.log(Name, Email, Password);
    setLoading(true);

    const response = await axios.post("http://localhost:8000/api/user/signup", {
      name: Name,
      email: Email,
      password: Password
    })

    setResponse(response.data);
    setLoading(false);
    console.log(response.data);

  }
  return (
    <div className='backdrop-blur-sm bg-white/50  min-h-screen'>
      <div className='flex justify-center  bg-blue-200  items-center min-h-screen  '>
        <form className='bg-white-500 p-10 rounded-lg shadow-lg w-96 '>
          <h1 className='text-bold text-2xl text-center '>Signup for Resume Teacher</h1>
          <div className='flex flex-col gap-4 mt-4'>
            <input onChange={(e) => setName(e.target.value)} type="text" placeholder='Name' className='p-2 border border-gray-300 rounded-lg' />
            <input onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder='Email' className='p-2 border border-gray-300 rounded-lg' />
            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' className='p-2 border border-gray-300 rounded-lg' />
            <button type='submit' className='p-2 bg-blue-500 text-white rounded-lg' onClick={HandleSignup}>Create Account </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup 
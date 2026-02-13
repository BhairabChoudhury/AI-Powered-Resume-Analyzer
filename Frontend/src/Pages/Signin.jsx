import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa'
import { CgSpinner } from 'react-icons/cg' 

const Signin = ()=>{ 

    const [email ,setEmail ] = useState("") ; 
    const [password ,setPassword ] = useState("") ;
    const [loading , setLoading ] = useState(false) ;
    const [error , setError ] = useState("") ; 

    const handleSignin = async (e) =>{
        e.preventDefault() ; 
        setError(""); 
        setLoading(true) ; 
        try {
            const response = await axios.post("http://localhost:8000/api/user/signin", {
                email,
                password
            }) ; 
            console.log(response.data) ; 
        } catch (error) {
            console.error(error) ; 
            setError("Login failed. Please try again.") ; 
        } finally {
            setLoading(false) ; 
        }
    }
    return (
        <div>
            <h1>Signin</h1>
        </div>
    ) 
}

export default Signin ;  
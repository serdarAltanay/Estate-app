import React from 'react'
import "./UserProfile.scss"
import { toast } from "react-toastify"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function UserProfile() {
    const navigate = useNavigate()
    const handleLogout = async () => {
        try{
            const res = await axios.post("http://localhost:8000/api/auth/logout")
            localStorage.removeItem("user")
            toast.success("user logout successfully")
            navigate("/")
        }catch(err){
            toast.error(err)
        }
    }

  return (
    <button onClick={handleLogout}>Log out</button>
  )
}

export default UserProfile
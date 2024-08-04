import React, { useContext } from 'react'
import "./UserProfile.scss"
import { toast } from "react-toastify"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'

function UserProfile() {
    const navigate = useNavigate()
    const {currentUser,updateUser} = useContext(AuthContext)
    const handleLogout = async () => {
        try{
            await axios.post("http://localhost:8000/api/auth/logout")
            updateUser(null)
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
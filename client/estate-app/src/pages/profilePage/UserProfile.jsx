import React, { useContext } from 'react'
import "./UserProfile.scss"
import { toast } from "react-toastify"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import apiRequest from '../../services/apiRequest'

function UserProfile() {
    const navigate = useNavigate()
    const {updateUser} = useContext(AuthContext)
    const handleLogout = async () => {
        try{
            await apiRequest.post("/auth/logout")
            updateUser(null)
            toast.success("user logout successfully")
            navigate("/")
        }catch(err){
            toast.error(err)
        }
    }
    const handleUpdate =() => {
      navigate("/profile/update-profile")
    }

  return (
    <>
    <button onClick={handleLogout}>Log out</button>
    <button onClick={handleUpdate}>Update profile</button>
    </>
  )
}

export default UserProfile
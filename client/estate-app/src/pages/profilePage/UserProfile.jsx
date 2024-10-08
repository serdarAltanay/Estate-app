import React, { useContext } from 'react'
import "./UserProfile.scss"
import { toast } from "react-toastify"
import { useNavigate,Link } from 'react-router-dom'
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
    const handleDelete = async () => {
      navigate("/profile/delete-profile")
    }
    const handlePassword = async () => {
      navigate("/profile/change-password")
    }

  return (
    <>
    <button onClick={handleLogout}>Log out</button>
    <button onClick={handleUpdate}>Update profile</button>
    <button onClick={handleDelete}>Delete profile</button>
    <button onClick={handlePassword}>Change Password</button>
    <Link to="/add">
      <button>Create Post</button>
    </Link>


    </>
  )
}

export default UserProfile
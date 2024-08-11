import React, { useContext,useEffect,useState  } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import apiRequest from '../../services/apiRequest'
import { toast } from 'react-toastify'


function UpdatePassword() {
    const {currentUser,updateUser} = useContext(AuthContext)
    const [isLoading,setIsLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        }
      }, [currentUser, navigate]);

    const handleSubmit = async (e) =>{
        e.preventDefault()
      setIsLoading(true)
      const formData = new FormData(e.target)
  
      const oldPassword = formData.get("oldPassword")
      const newPassword = formData.get("newPassword")
        
      try{
        await apiRequest.put(`/users/change-password/${currentUser.id}`,{
        oldPassword,newPassword})
        toast.success("Password changed succesfully!\nYou need to login again")
        updateUser(null)
        navigate("/login")
      }catch(err){
        console.log(err)
        toast.error("password change failed:" + err)
      }finally{
        setIsLoading(false)
      }
    }
  return (
    <div className="passwordUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Change Password</h1>
          <input name="oldPassword" require  type="password" placeholder="Old Password" />
          <input name="newPassword" required type="password" placeholder="New Password" />
          <button disabled={isLoading}>Change Password</button>
        </form>
      </div>
    </div>
  )
}

export default UpdatePassword
import { useNavigate} from "react-router-dom"
import { Link } from "react-router-dom"
import axios from "axios"
import { useState } from "react"
import { toast } from "react-toastify"
import "./Login.scss"
function Login() {
    const [error,setError] = useState("")
    const [isLoading,setIsLoading] = useState(false)

    const navigate = useNavigate()
    const onSubmit = async (e) =>{
      e.preventDefault()
      setIsLoading(true)
      const formData = new FormData(e.target)
  
      const username = formData.get("username")
      const password = formData.get("password")
  
      try{
        const req = await axios.post("http://localhost:8000/api/auth/login",{
        username,password}).then(
            toast.success("User Login succesfully!")
        )
        // navigate("/login")
      }catch(err){
        console.log(err)
        setError(err.response.data.message)
        toast.error("registration failed:" + error)
      }finally{
        setIsLoading(false)
      } 
    }
  return (
    <div className="loginPage">
      <div className="formContainer">
        <form onSubmit={onSubmit}>
          <h1>Welcome Back</h1>
          <input name="username" require minLength={3} maxLength={15} type="text" placeholder="Username" />
          <input name="password" required type="password" placeholder="Password" />
          <button disabled={isLoading}>Login</button>
          <Link to="/register">Don't you have an account?</Link>
        </form>
      </div>
    </div>
  )
}

export default Login
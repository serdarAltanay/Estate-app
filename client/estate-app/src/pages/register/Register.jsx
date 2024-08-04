import "./Register.scss"
import { useNavigate} from "react-router-dom"
import { Link } from "react-router-dom"
import axios from "axios"
import { useState } from "react"
import { toast } from "react-toastify"

function Register() {
  const [error,setError] = useState("")
  const [isLoading,setIsLoading] = useState(false)

  const navigate = useNavigate()
  const onSubmit = async (e) =>{
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData(e.target)

    const username = formData.get("username")
    const email = formData.get("email")
    const password = formData.get("password")

    try{
      await axios.post("http://localhost:8000/api/auth/register",{
      username,email,password}).then(
        toast.success("User created succesfully!")
    )
      navigate("/login")
    }catch(err){
      console.log(err)
      setError(err.response.data.message)
      toast.error("registration failed:" + error)
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <div className="registerPage">
      <div className="formContainer">
        <form onSubmit={onSubmit}>
          <h1>Create an Account</h1>
          <input name="username" required minLength={3} maxLength={15} type="text" placeholder="Username" />
          <input name="email" required type="text" placeholder="Email" />
          <input name="password" required type="password" placeholder="Password" />
          <button disabled={isLoading}>Register</button>
          {error && <span>{error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
    </div>
  )
}

export default Register
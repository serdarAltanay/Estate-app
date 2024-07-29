import "./Register.scss"
import {Link} from "react-router-dom"
import axios from "axios"
import { useState } from "react"

function Register() {
  const [err,setErr] = useState("")

  const onSubmit = async (e) =>{
    e.preventDefault()
    const formData = new FormData(e.target)

    const username = formData.get("username")
    const email = formData.get("email")
    const password = formData.get("password")

    try{
      const res = await axios.post("http://localhost:8000/api/auth/register",{
      username,email,password})
      console.log(res.data)
    }catch(err){
      console.log(err)
      // setErr(err)
    }
    
    
  }

  return (
    <div className="registerPage">
      <div className="formContainer">
        <form onSubmit={onSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button>Register</button>
          {/* <Link to="/login">Do you have an account?</Link> */}
        </form>
      </div>
    </div>
  )
}

export default Register
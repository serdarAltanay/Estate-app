import "./Register.scss"
import { useNavigate} from "react-router-dom"
import { useState } from "react"
import { toast } from "react-toastify"
import apiRequest from "../../services/apiRequest"
import { Link } from "react-router-dom"


function Register() {
  const [error,setError] = useState("")
  const [isLoading,setIsLoading] = useState(false)
  const [file, setFile] = useState(null);

  const navigate = useNavigate()
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    const formData = new FormData(e.target);
    formData.append('avatar', file);
  
    try {
      await apiRequest.post("/auth/register", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError('Registration failed: ' + err.message);
      toast.error("Registration failed: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="registerPage">
      <div className="formContainer">
        <form onSubmit={onSubmit}>
          <h1>Create an Account</h1>
          <input name="username" required minLength={3} maxLength={15} type="text" placeholder="Username" />
          <input name="email" required type="text" placeholder="Email" />
          <input name="password" required type="password" placeholder="Password" />
          <div className='uploadWidget'>
            <h2 className='title'>Upload Avatar:</h2>
            <input type="file" onChange={handleFileChange} accept="image/*" />
          </div>
          <button disabled={isLoading}>Register</button>
          {error && <span>{error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
    </div>
  )
}

export default Register
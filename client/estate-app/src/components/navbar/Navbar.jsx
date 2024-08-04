import { useContext, useEffect } from "react"
import "./Navbar.scss"
import { AuthContext } from "../../contexts/AuthContext"
import { Link } from "react-router-dom";

function Navbar() {
  const {currentUser} = useContext(AuthContext)

  
  return (
    <nav>
        <div className="container">
            <div className="left">
                <a href="/" className="logo">
                    {/* logo */}
                    <span>Estate App</span>
                </a>
            </div>
            <div className="right">
                  {currentUser ? (
                  <div className="user">
                    <img src={currentUser.avatar || "/noavatar.jpg"} alt="" />
                    <span>{currentUser.username}</span>
                    <Link to="/profile" className="profile">
                      {/* {number > 0 && <div className="notification">{number}</div>} */}
                      <span>Profile</span>
                    </Link>
                  </div>
                        ) : (
                      <>
                        <a href="/login" className="login">Sign in</a>
                        <a href="/register" className="register">
                          Sign up
                        </a>
                      </>
                    )}
            </div>
        </div>
    </nav>
  )
}

export default Navbar
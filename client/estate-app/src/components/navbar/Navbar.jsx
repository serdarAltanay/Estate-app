import "./Navbar.scss"

function Navbar() {
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
                    <a href="/login">Sign in</a>
                    <a href="/register" className="register">
                    Sign up
                    </a>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
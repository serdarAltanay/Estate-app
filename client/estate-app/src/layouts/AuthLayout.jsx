import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import { AuthContext } from '../contexts/AuthContext';
import { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import "./layout.scss"
function AuthLayout() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser) {
      toast.warning("Login first");
      navigate("/login");
    }
  }, [currentUser, navigate]);

  return (
    <div className='layout'>
      <div className='navbar'>
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;

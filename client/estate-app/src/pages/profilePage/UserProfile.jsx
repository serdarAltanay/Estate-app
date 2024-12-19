import React, { useContext, 
                useEffect, 
                useState } from 'react';
import './UserProfile.scss';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import apiRequest from '../../services/apiRequest';
import ForgotPasswordButton from '../../components/forgotPasswordButton/ForgotPasswordButton';

function UserProfile() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const { currentUser, updateUser } = useContext(AuthContext); // Get user data from context

  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.username);
      setEmail(currentUser.email);
      setAvatar(currentUser.avatar)
    } else {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const handleLogout = async () => {
    try {
      await apiRequest.post('/auth/logout');
      updateUser(null);
      toast.success('User logged out successfully');
      navigate('/');
    } catch (err) {
      toast.error(err);
    }
  };

  const handleUpdate = () => {
    navigate('/profile/update-profile');
  };

  const handleDelete = () => {
    navigate('/profile/delete-profile');
  };

  const handlePassword = () => {
    navigate('/profile/change-password');
  };

  return (
    <div className="user-profile">
      <div className="profile-section">
        <div className="profile-picture">
        <img src={avatar ? `http://localhost:8000${avatar}` : "/noavatar.jpg"}  alt="" />
        </div>
        <h2 className="username">{username}</h2>
        <p className="email">{email}</p>
      </div>

      {/* Buttons Section */}
      <div className="button-section">
        <button onClick={handleLogout}>Log out</button>
        <button onClick={handleUpdate}>Update Profile</button>
        <button onClick={handleDelete}>Delete Profile</button>
        <button onClick={handlePassword}>Change Password</button>
        <ForgotPasswordButton/>
        <Link to="/add">
          <button>Create Post</button>
        </Link>
      </div>
    </div>
  );
}

export default UserProfile;

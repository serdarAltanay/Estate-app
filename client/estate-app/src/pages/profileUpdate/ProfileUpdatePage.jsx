import { useContext, useEffect, useState } from "react";
import "./ProfileUpdatePage.scss";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiRequest from "../../services/apiRequest.js";
import UploadAvatar from "../../components/uploadImage/UploadImage.jsx";


function ProfileUpdatePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const { currentUser, updateUser } = useContext(AuthContext);


  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.username);
      setEmail(currentUser.email);
    } else {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.target);
    const { username, email } = Object.fromEntries(formData);

    try {
      const res = await apiRequest.put(`/users/${currentUser.id}`, {
        username:username,
        email:email,
      });
      updateUser(res.data);
      navigate("/profile");
    } catch (err) {
      toast.error(err)
      setError("Profile update failed.");
      setIsLoading(false);
    }
  };

  return (
    <div className="updatePage">
      <div className="formContainer">
        <form onSubmit={handleUpdate}>
          <h1>Update Profile</h1>
          <input
            name="username"
            required
            minLength={3}
            maxLength={15}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            name="email"
            required
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button disabled={isLoading}>Update</button>
          {error && <span>{error}</span>}
        </form>
      </div>
      <div className="sideContainer">
      <img className="avatar"src={currentUser.avatar ? `http://localhost:8000${currentUser.avatar}` : "/noavatar.jpg"}  alt="" />
      <UploadAvatar/>
      </div>
    </div>
  );
}

export default ProfileUpdatePage;

import { useContext, useState } from "react";
import "./DeleteProfile.scss";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiRequest from "../../services/apiRequest";

function DeleteProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const { currentUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      await apiRequest.post(`/users/delete/${currentUser.id}`, {
        username,
        password,
      });
      updateUser(null);
      toast.success("Profile deleted successfully!");
      navigate("/");
    } catch (err) {
      console.log(err);
      setError("Profile deletion failed.");
      toast.error(`Profile deletion failed: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="deletePage">
      <div className="formContainer">
        <form onSubmit={handleDelete}>
          <h1>Warning!</h1>
          <h2>You are about to delete your Estate-app profile</h2>
          <p>Please write your username and password to apply deletion</p>
          <input name="username" required minLength={3} maxLength={15} type="text" placeholder="Username" />
          <input name="password" required type="password" placeholder="Password" />
          <button disabled={isLoading}>Delete Profile</button>
        </form>
      </div>
    </div>
  );
}

export default DeleteProfile;

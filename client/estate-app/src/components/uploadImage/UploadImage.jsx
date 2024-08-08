import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import "./uploadImage.scss";
import apiRequest from "../../services/apiRequest.js"

const UploadAvatar = () => {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('avatar', file);

    setIsLoading(true);
    try {
      const res = await apiRequest.post(
        `/users/upload-avatar/${currentUser.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );
      toast.success('Avatar uploaded successfully!');
      updateUser(res.data.user);
    } catch (err) {
      console.error('Error uploading avatar:', err.response ? err.response.data : err.message);
      toast.error('Failed to upload avatar.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='uploadWidget'>
      <h2 className='title'>Upload Avatar:</h2>
      <form className='form' onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept="image/*" />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
};

export default UploadAvatar;

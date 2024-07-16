import React from 'react';
import AuthService from '../services/authService';

const Profile = () => {
  const user = AuthService.getCurrentUser();

  return (
    <div>
      <h1>Profile</h1>
      <p>Username: {user && user.username}</p>
    </div>
  );
};

export default Profile;
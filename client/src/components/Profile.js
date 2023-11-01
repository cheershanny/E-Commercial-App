import React, { useState, useEffect } from 'react';

function Profile(props) {
  const [profileData, setProfileData] = useState({});
  const userId = props.userId;

  useEffect(() => {
    fetch(`/profile/${userId}`)
      .then(res => res.json())
      .then(data => setProfileData(data))
      .catch(error => console.error('Error fetching profile:', error));
  }, [userId]);

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <p><strong>Username:</strong> {profileData.username}</p>
      <p><strong>Email:</strong> {profileData.email}</p>

    </div>
  );  
}

export default Profile;

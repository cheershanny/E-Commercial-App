import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Profile() {
  const [profileData, setProfileData] = useState({});
  const { userId } = useParams();

  useEffect(() => {
    fetch(`/profile/${userId}`)
      .then(res => res.json())
      .then(data => setProfileData(data))
      .catch(error => console.error('Error fetching profile:', error));
  }, [userId]);

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <p><strong>Username:</strong> {profileData[0].username}</p>
      <p><strong>Email:</strong> {profileData[0].email}</p>
      {console.log(profileData)}
    </div>
  );
}

export default Profile;

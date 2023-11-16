import React, { useState, useEffect } from "react";
import OrderDetail from "../Product/OrderDetail";
import Logout from "./Logout";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`profile`, {
      credentials: 'include' 
    })
    .then((res) => {
      if (!res.ok) throw new Error('Not authenticated');
      return res.json();
    })
    .then((data) => {
      setProfileData(data);
    })
    .catch((error) => {
      console.error("Error:", error);
      navigate('/login'); 
    });
  }, [navigate]);


  if (!profileData) return null;  

  return (
    <>
      <div className="profile-container">
        <h2>User Profile</h2>
        <p>
          <strong>Username:</strong> {profileData.username}
        </p>
        <p>
          <strong>Email:</strong> {profileData.email}
        </p>
      </div>
      <div>
        <OrderDetail />
      </div>
      <div>
        <Logout />
      </div>
    </>
  );
}

export default Profile;

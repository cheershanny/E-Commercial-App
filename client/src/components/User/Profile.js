import React, { useEffect } from "react";
import OrderDetail from "../Product/OrderDetail";
import Logout from "./Logout";
import { useNavigate } from "react-router-dom";

function Profile({user, setUser}) {
  const navigate = useNavigate();
  console.log({user});

  useEffect(() => {
    fetch(`profile`, {
      credentials: 'include' 
    })
    .then((res) => {
      if (!res.ok) throw new Error('Not authenticated');
      return res.json();
    })
    .then((data) => {
      setUser(data);
    })
    .catch((error) => {
      console.error("Error:", error);
      navigate('/login'); 
    });
  }, [setUser, navigate]);

  const handleLogout = () => {
    setUser(null); 
  };


  if (!user) return null;  

  return (
    <>
      <div className="profile-container">
        <h2>User Profile</h2>
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>
      <div>
        <OrderDetail />
      </div>
      <div>
        <Logout onLogout={handleLogout} />
      </div>
    </>
  );
}

export default Profile;

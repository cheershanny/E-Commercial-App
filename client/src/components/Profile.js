import React, { useState, useEffect } from "react";
import OrderDetail from "./OrderDetail";
import Logout from "./Logout";

function Profile(props) {
  const [profileData, setProfileData] = useState({});
  const userId = props.userId;
  

  useEffect(() => {
    fetch(`/profile/${userId}`)
      .then((res) => res.json())
      .then((data) => setProfileData(data))
      .catch((error) => console.error("Error fetching profile:", error));
  }, [userId]);

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
       <OrderDetail userId={userId} />
      </div>
      <div>
        <Logout />
      </div>
    </>
  );
}

export default Profile;

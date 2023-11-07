import React, { useState, useEffect } from "react";
import OrderDetail from "./OrderDetail";
import Logout from "./Logout";

function Profile({user_id}) {
  const [profileData, setProfileData] = useState({});
  

  useEffect(() => {
    fetch(`/profile/${user_id}`)
      .then((res) => res.json())
      .then((data) => setProfileData(data))
      .catch((error) => console.error("Error fetching profile:", error));
  }, [user_id]);

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
       <OrderDetail user_id={user_id} />
      </div>
      <div>
        <Logout />
      </div>
    </>
  );
}

export default Profile;

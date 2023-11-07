import React from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    const response = await fetch("/logout");
    if (response.ok) {
      navigate("/");
    }
  };
  return (
    <div className="logout-container">
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

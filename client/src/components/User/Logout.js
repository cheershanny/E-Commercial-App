import React from "react";
import { useNavigate } from "react-router-dom";

export default function Logout({ onLogout }) {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const response = await fetch("/logout", {
      credentials: 'include' 
    });
    if (response.ok) {
      onLogout(); 
      navigate("/");
    }
  };
  return (
    <div className="logout-container">
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

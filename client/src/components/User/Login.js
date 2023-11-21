import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [errorMsg, setErrorMsg] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username, password}),
    });
    
    const data = await response.json();
    if (response.ok) {
      props.setUser(data);
      navigate(`/profile`);
      return data;
    } else {
      setErrorMsg(JSON.stringify(data.message));
    }
    
  };


  return (
    <div className="login-container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit} id="login" name="login">
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/register">Register here</a>
      </p>
      {errorMsg && <div className="error">{errorMsg}</div>}
    </div>
  );
}

export default Login;

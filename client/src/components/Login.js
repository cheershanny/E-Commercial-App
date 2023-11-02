import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      props.setUser(data);
      navigate(`/profile/${data.user_id}`);
    } else if (response.status === 404) {
      setErrorMsg("User does not exist");
    } else {
      console.error("Login failed.");
      setErrorMsg("Login failed.");
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
      <div className="third-party-login">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />

        <button onClick={() => (window.location.href = "/auth/facebook")}>
          Login with Facebook
        </button>
      </div>
      <p>
        Don't have an account? <a href="/register">Register here</a>
      </p>
      {errorMsg && <p className="error-message">{errorMsg}</p>}
    </div>
  );
}

export default Login;

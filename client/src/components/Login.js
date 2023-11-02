import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

function Login(props) {
  const [errorMsg, setErrorMsg] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const UseLoginFetch = async (endpoint, body) => {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (response.ok) {
      props.setUser(data);
      navigate(`/profile/${data.user_id}`);
      return null;
    } else if (response.status === 404) {
      return "User does not exist";
    } else {
      return "Login failed.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = await UseLoginFetch("/login", { username, password });
    if (error) setErrorMsg(error);
  };

  // const handleGoogleLogin = async (credentialResponse) => {
  //   const error = await UseLoginFetch(
  //     "/auth/google",
  //     credentialResponse
  //   );
  //   if (error) setErrorMsg(error);
  // };

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
          onSuccess={() => {
            window.location.href = "/auth/google";
          }}
          onError={() => {
            console.log("Login Failed");
            setErrorMsg("Google login failed.");
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

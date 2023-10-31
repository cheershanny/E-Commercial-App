import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const userData = await response.json();
        props.setUser(userData);
        navigate(`/profile/${userData.user_id}`);
      } else {
        const errorData = await response.json();
        setErrorMsg(errorData.message);
      }
    } catch (error) {
      console.error("There was an error logging in", error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="third-party-login">
        <button onClick={() => window.location.href='/auth/google'}>Login with Google</button>
        <button onClick={() => window.location.href='/auth/facebook'}>Login with Facebook</button>
      </div>
      <p>Don't have an account? <a href="/register">Register here</a></p>
      {errorMsg && <p className="error-message">{errorMsg}</p>}
    </div>
  );
}

export default Login;

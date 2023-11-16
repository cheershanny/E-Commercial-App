import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



function Register(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(''); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }), 
    });

    if (response.ok) {
      const data = await response.json();
      props.setUser(data);
      console.log(data);  
      navigate(`/profile`);  
    } else if (response.status === 409) {  
        setErrorMsg('User already exists. Choose a different username or email.');
      } else {
      console.error('Registration failed.');
    }
  };

  return (
    <div className='register-container'>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Username: </label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className='form-group'>
          <label>Email: </label>  
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='form-group'>
          <label>Password: </label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <a href="/login">Login here</a></p>
      {errorMsg && <div className="error">{errorMsg}</div>}
    </div>
  );
}

export default Register;

import "./styles/App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/User/Register";
import Login from "./components/User/Login";
import Profile from "./components/User/Profile";
import Logout from "./components/User/Logout";

function App() {
  const [user, setUser] = useState(null);
  const handleLogout = () => {
    setUser(null); 
  };
  useEffect(() => {
    fetch(`check-auth`, {
      credentials: 'include' 
    })
    .then((res) => {
      if (!res.ok) throw new Error('Not authenticated');
      return res.json();
    })
    .then((data) => {
      setUser(data.user);
    })
    .catch((error) => {
      console.error("Error:", error);
      setUser(null);
    });
  }, []);

  return (
    <Router>
      <div className="Nav">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              user ? <Home user_id={user.user_id} /> : <Home user_id={null} />
            }
          />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
          <Route
            path="/profile"
            element={
              user ? (
                <Profile user_id={user.user_id} />
              ) : (
                <Login setUser={setUser} />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

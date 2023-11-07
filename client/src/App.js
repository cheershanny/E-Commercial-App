import "./styles/App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Register from "./components/User/Register";
import Login from "./components/User/Login";
import Profile from "./components/User/Profile";

function App() {
  const [user, setUser] = useState(null);
  return (
    <Router>
      <div className="Nav">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="profile/:user_id">Profile</Link>
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
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route
            path="/profile/:user_id"
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

import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import OrderDetail from "./components/OrderDetail";

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
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setUser={setUser}  />} />
          <Route path="/profile/:user_id" element={user ? <Profile userId={user.user_id}/> : <Login setUser={setUser} />} />
          <Route path="/profile/:user_id/orders" element={user ? <OrderDetail userId={user.user_id} /> : <Login setUser={setUser} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

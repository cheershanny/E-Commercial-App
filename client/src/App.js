import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Register from "./components/Register";

function App() {
  return (
    <Router>
      <div className="App">
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
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

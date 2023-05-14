import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log("sign in successful!");
      navigate("/home");
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };
  return (
    <main className="login">
      <div className="container">
        <div className="form__container">
          <h1>Welcome to Citizens Watch</h1>
          <span>enter your email and password to login</span>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
            <label htmlFor="password">password</label>
            <input type="password" name="password" id="password" />
            <button type="submit" className="cta_">
              {loading ? "Authenticating..." : "Login"}
            </button>
          </form>
          <p className="sub">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;

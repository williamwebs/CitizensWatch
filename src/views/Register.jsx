import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res.user);
      console.log("success create user");
      // Add a new document in collection "cities"
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        email,
      });
      console.log("success db");
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
          <span>enter your email and password to Register</span>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
            <label htmlFor="password">password</label>
            <input type="password" name="password" id="password" />
            {/* <Btn title="Register" /> */}
            <button type="submit" className="cta_">
              {loading ? "Authenticating..." : "Register"}
            </button>
          </form>
          <p className="sub">
            Have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Register;

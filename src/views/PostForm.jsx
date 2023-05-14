import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { BottomNav, Nav } from "../config";
import "../styles/postform.css";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { AuthContext } from "../contexts/AuthContext";

const PostForm = () => {
  const user = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const incident = e.target[0].value;
    const location = e.target[1].value;
    const details = e.target[2].value;

    console.log(incident, location, details);

    try {
      // creates a subCollection Post to hold each users reports / post
      // const docRef = await addDoc(collection(db, "users", user.uid, "posts"), {
      //   incident,
      //   location,
      //   details,
      //   createdAt: serverTimestamp(),
      // });
      // console.log(docRef);
      // console.log("New post created with ID:", docRef.id);
      // Add a new document with a generated id.

      const docRef = await addDoc(collection(db, "allPosts"), {
        userID: user.uid,
        incident,
        location,
        details,
        createdAt: serverTimestamp(),
      });
      console.log(docRef);
      console.log("New post created with ID:", docRef.id);

      // add each post to the allPosts collection
      // await setDoc(doc(db, "AllPosts", user.uid), {
      //   incident,
      //   location,
      //   details,
      // });
      // console.log("success db");
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };
  return (
    <main className="post__form__container">
      <Nav />
      <div className="container">
        <div className="form__container">
          <h1 style={{ textAlign: "center" }}>Incident Reporting Form</h1>
          <span>Please fill in appropraite information about the incident</span>
          <form onSubmit={handleSubmit}>
            <label htmlFor="incident_type">Type of Incident</label>
            <select name="incident" id="incident">
              <option value="Robbrey">Robbrey</option>
              <option value="Traffic">Traffic</option>
              <option value="Fire">Fire</option>
              <option value="Accident">Accident</option>
            </select>
            <label htmlFor="location">Location of Incident</label>
            <input type="text" name="location" id="location" />
            <label htmlFor="incident_details">Details of the Incident</label>
            <textarea name="incident_details" id="incident_details"></textarea>
            <button type="submit" className="cta_">
              {loading ? "Reporting..." : "Report Incident"}
            </button>
          </form>
        </div>
      </div>
      <BottomNav />
    </main>
  );
};

export default PostForm;

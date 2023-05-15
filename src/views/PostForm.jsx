import React, { useContext, useState } from "react";
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

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostForm = () => {
  const user = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [incident, setIncident] = useState("");
  const [location, setLocation] = useState("");
  const [details, setDetails] = useState("");

  const notify = () =>
    toast("🦄 Report submitted!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const incident = e.target[0].value;

    console.log(incident, location, details);

    try {
      const docRef = await addDoc(collection(db, "allPosts"), {
        userID: user.uid,
        incident,
        location,
        details,
        createdAt: serverTimestamp(),
      });
      console.log(docRef);
      console.log("New post created with ID:", docRef.id);

      notify();

      setDetails("");
      setLocation("");

      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setDetails("");
      setLocation("");
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
            <input
              type="text"
              name="location"
              id="location"
              onChange={(e) => setLocation(e.target.value)}
              value={location}
            />
            <label htmlFor="incident_details">Details of the Incident</label>
            <textarea
              name="incident_details"
              id="incident_details"
              onChange={(e) => setDetails(e.target.value)}
              value={details}
            ></textarea>
            <button type="submit" className="cta_">
              {loading ? "Reporting..." : "Report Incident"}
            </button>
          </form>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
      <BottomNav />
    </main>
  );
};

export default PostForm;

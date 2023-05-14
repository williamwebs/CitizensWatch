import React from "react";
import { Link } from "react-router-dom";
import image1 from "../assets/report2.png";
import "../styles/dashboard.css";

const Dashboard = () => {
  return (
    <main>
      <div className="container">
        <header>
          <div className="row">
            <div className="image">
              <div className="background"></div>
              <img src={image1} alt="people standing" />
            </div>
            <div className="text">
              <h1>Welcome to Citizens Watch</h1>
              <span>Be Informed, Stay Safe</span>
              <Link to="/explore" className="cta">
                Explore
              </Link>
            </div>
          </div>
        </header>
      </div>
    </main>
  );
};

export default Dashboard;

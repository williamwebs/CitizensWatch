import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BottomNav, Nav } from "../config";
import { AiOutlineArrowLeft } from "react-icons/ai";

const SingleReport = () => {
  const location = useLocation();
  const data = location?.state;
  console.log(data);

  return (
    <main>
      <Nav />
      <div className="container box">
        <Link to="/home">
          <AiOutlineArrowLeft className="back__icon" />
        </Link>
        <div className="report__card">
          <div className="flex">
            <span className="incident__type">{data.incident}</span>
            <span className="incident__location">{data.location}</span>
            <span
              style={{
                flex: "1",
                textAlign: "right",
              }}
            >
              {data.timestamp.toLocaleTimeString()}
            </span>
          </div>
          <div>{data.details}</div>
          <div className="bottom">
            <span>{data.timestamp.toDateString()}</span>
          </div>
        </div>
      </div>
      <BottomNav />
    </main>
  );
};

export default SingleReport;

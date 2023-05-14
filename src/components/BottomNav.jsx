import React from "react";
import { Link } from "react-router-dom";
import { BsFillPersonFill, BsPlus, BsAirplaneFill } from "react-icons/bs";
import "./bottomNav.css";
import { useReducer } from "react";

const BottomNav = () => {
  return (
    <nav className="bottom__nav">
      <ul className="nav__lists">
        <li>
          <Link to="/home">
            <BsAirplaneFill className="nav__icon" />
          </Link>
        </li>
        <li>
          <Link to="/postForm">
            <BsPlus className="nav__icon plus" />
          </Link>
        </li>
        <li>
          <Link to="/post">
            <BsFillPersonFill className="nav__icon" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default BottomNav;

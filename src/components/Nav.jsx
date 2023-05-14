import React from "react";
import "./nav.css";

const Nav = () => {
  return (
    <nav className="top__nav">
      <h2>Citizens Watch</h2>
      <marquee>
        <span>Live incedent reports near you ...</span>
      </marquee>
    </nav>
  );
};

export default Nav;

import React from "react";

const Btn = ({ title }) => {
  return (
    <button type="submit" className="cta_">
      {title}
    </button>
  );
};

export default Btn;

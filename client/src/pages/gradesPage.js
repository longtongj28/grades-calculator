import React from "react";
import "../components/homepageBack.css";

const GradesPage = (props) => {
  console.log(props.username);
  return (
    <>
      <div className="homepageBackground" />
      <div style={{color: "white"}}>{props.username}</div>
    </>
  );
};

export default GradesPage;

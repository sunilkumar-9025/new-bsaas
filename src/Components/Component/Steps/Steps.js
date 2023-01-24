import React from "react";
import {  useNavigate } from "react-router-dom";

const Steps = (props) => {
  const navigate = useNavigate()
  return (
    <div className={"stepBlock" + (props.selected ? " selected" : "")}>
      <div
        className="circleWrapper"
        // onClick={() => navigate(`${props.path}`)}
      >
        <div className="circle">{props.label}</div>
      </div>
    </div>
  );
};

export default Steps;

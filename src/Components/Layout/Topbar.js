import React from "react";
import { Card } from "primereact/card";
import { useNavigate } from "react-router-dom";
const Topbar = (props) => {
  const navigate = useNavigate();
  return (
    <div className="topbar">
      <Card className="shadow-5">
        <div className="grid">
          <div className="col-1 flex justify-content-end align-items-center">
            <i className="pi pi-chevron-left" onClick={() => navigate(-1)}></i>
          </div>
          <div className="col-11 topbar-heading">{props.heading}</div>
        </div>
        <div className="grid">
          <div className="col-11 col-offset-1 topbar-title">{props.title}</div>
        </div>
      </Card>
    </div>
  );
};

export default Topbar;

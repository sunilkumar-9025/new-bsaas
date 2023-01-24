import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import React from "react";
import { useNavigate } from "react-router-dom";
import StepNavigation from "../Component/Steps/StepNavigation";
import { labelArray } from "../Data/Data";
import Topbar from "../Layout/Topbar";
import useAuth from "../Store/store";

const Review = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const handleSelect = (id, path) => {
    auth.selectData(id);
    navigate(path);
  };
  const handleSave = () => {
    navigate('/projects/acknowledgement')
  };
  return (
    <div className="review">
      <Topbar heading="New Project" title={<StepNavigation />} />
      <div className="col-6 col-offset-1 md:col-6 mt-3">
        <div className="review-heading">
          <h4 className="heading">Launch</h4>
          <Divider />
        </div>
        {labelArray.map((element, index) => {
          return (
            <div className="flex">
              <div className="col-11">{element.label}</div>
              <div className="col-1">
                <i
                  className="pi pi-user-edit"
                  onClick={() => handleSelect(index + 1, element.path)}
                ></i>
              </div>
            </div>
          );
        })}
        <div className="col-12 mt-4">
          <Button
            label="Launch"
            onClick={handleSave}
            style={{ width: "100%", marginBottom: "10px" }}
          />
          <Button
            label="Save as draft"
            onClick={handleSave}
            style={{ width: "100%", background: "#fff", color: "#000" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Review;

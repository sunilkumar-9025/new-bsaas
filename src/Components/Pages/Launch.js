import { Checkbox } from "primereact/checkbox";
import React, { useEffect } from "react";
import StepNavigation from "../Component/Steps/StepNavigation";
import useAuth from "../Store/store";
import { launchCategories } from "../Data/Data";
import { Divider } from "primereact/divider";
import Topbar from "../Layout/Topbar";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { useState } from "react";
const Launch = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [launch, setLaunch] = useState([]);

  useEffect(() => {
    const fillData = () => {
      const { launch } = auth.currentData;
      setLaunch(launch);
    };
    if (auth.currentData !== null) {
      fillData();
    }
  }, [auth.currentData]);

  useEffect(() => {
    if (launch.length > 0) auth.ChangeFormValid();
  });
  const handleSave = () => {
    const obj = { launch };
    if (auth.formType === "Add") {
      auth.AddProject(obj);
      auth.setProjectSteps(5);
    } else {
      auth.updateProject(obj, auth.currentData.id);
    }
    navigate("/projects/review");
    resetForm();
  };

  const resetForm = () => {
    setLaunch([]);
  };

  const onLaunchChange = (e) => {
    let selectedLaunch = [...launch];
    if (e.checked) selectedLaunch.push(e.value);
    else selectedLaunch.splice(selectedLaunch.indexOf(e.value), 1);
    setLaunch(selectedLaunch);
  };

  return (
    <div className="launch">
      <Topbar heading="New Project" title={<StepNavigation />} />
      <div className="col-4 col-offset-1 md:col-4 mt-1">
        <div className="launch-heading">
          <h4 className="heading">Launch</h4>
          <Divider />
        </div>
        <div className="grid">
          <div className="col-12">
            {launchCategories.map((category, index) => {
              return (
                <div key={index} className="field-checkbox mb-2">
                  <Checkbox
                    inputId={index}
                    name="launch"
                    value={category}
                    onChange={onLaunchChange}
                    checked={launch.some((item) => item === category)}
                  />
                  <label htmlFor={category}>{category}</label>
                </div>
              );
            })}
          </div>
        </div>

        <div className="col-12 mt-4">
          <Button
            label="Save"
            onClick={handleSave}
            disabled={auth.formValid}
            style={{ width: "100%", marginBottom: "10px" }}
          />
          <Button
            label="Save as draft"
            onClick={handleSave}
            disabled={auth.formValid}
            style={{ width: "100%", background: "#fff", color: "#000" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Launch;

import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Checkbox } from "primereact/checkbox";
import React, { useEffect, useState } from "react";
import StepNavigation from "../Component/Steps/StepNavigation";
import Topbar from "../Layout/Topbar";
import useAuth from "../Store/store";
import { testingCategories } from "../Data/Data";
import { useNavigate } from "react-router-dom";

const Testing = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [testing, setTesting] = useState([]);

  useEffect(() => {
    const fillData = () => {
      const { testing } = auth.currentData;
      setTesting(testing);
    };
    if (auth.currentData !== null) {
      fillData();
    }
  }, [auth.currentData]);

  useEffect(() => {
    if (testing.length > 0) auth.ChangeFormValid();
  });
  const handleSave = () => {
    const obj = { testing };
    if (auth.formType === "Add") {
      auth.AddProject(obj);
      navigate("/projects/manufacturing");
      auth.setProjectSteps(2);
    } else {
      auth.updateProject(obj, auth.currentData.id);
      navigate("/projects/review");
    }
    resetForm();
  };

  const resetForm = () => {
    setTesting([]);
  };

  const onTestingChange = (e) => {
    let selectedTesting = [...testing];
    if (e.checked) selectedTesting.push(e.value);
    else selectedTesting.splice(selectedTesting.indexOf(e.value), 1);
    setTesting(selectedTesting);
  };

  return (
    <div className="testing">
      <Topbar heading="New Project" title={<StepNavigation />} />
      <div className="col-5 col-offset-1 md:col-5 mt-3">
        <div className="testing-heading">
          <h4 className="heading">Testing & Claims</h4>
          <Divider />
        </div>
        <h5>Based on your Product lab suggests these cerificates to claim </h5>
        <div className="grid">
          <div className="col-12">
            {testingCategories.map((category, index) => {
              return (
                <div key={index} className="field-checkbox mb-2">
                  <Checkbox
                    inputId={index}
                    name="testing"
                    value={category}
                    onChange={onTestingChange}
                    checked={testing.some((item) => item === category)}
                  />
                  <label htmlFor={category}>{category}</label>
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-12">
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

export default Testing;

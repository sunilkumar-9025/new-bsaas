import React, { useEffect, useState } from "react";
import StepNavigation from "../Component/Steps/StepNavigation";
import Topbar from "../Layout/Topbar";
import { RadioButton } from "primereact/radiobutton";
import { FileUpload } from "primereact/fileupload";
import { Divider } from "primereact/divider";
import { formulationCategories } from "../Data/Data";
import { InputTextarea } from "primereact/inputtextarea";
import useAuth from "../Store/store";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const Formulation = () => {
  const [formulation, setFormulation] = useState(formulationCategories[0]);
  const [description, setDescription] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fillData = () => {
      const { formulation, description } = auth.currentData;
      setFormulation(formulation);
      setDescription(description);
    };
    if (auth.currentData !== null) {
      fillData();
    }
  }, [auth.currentData]);

  useEffect(() => {
    if (formulation !== "" && description !== "") auth.ChangeFormValid();
  });

  const handleSave = () => {
    const obj = { formulation, description };
    if (auth.formType === "Add") {
      auth.AddProject(obj);
      navigate("/projects/testing");
      auth.setProjectSteps(1);
    } else {
      auth.updateProject(obj, auth.currentData.id);
      navigate("/projects/review");
    }
    resetForm();
  };

  const resetForm = () => {
    setFormulation(formulationCategories[0]);
    setDescription("");
  };

  return (
    <div className="formulation">
      <Topbar heading="New Project" title={<StepNavigation />} />
      <div className="col-5 col-offset-1 md:col-5 mt-3">
        <div className="formulation-heading">
          <h4 className="heading">Formulation</h4>
          <Divider />
        </div>
        <div className="grid">
          {formulationCategories.map((category, index) => {
            return (
              <div key={index} className="field-radiobutton col">
                <RadioButton
                  inputId={index}
                  name="category"
                  value={category}
                  onChange={(e) => setFormulation(e.value)}
                  checked={formulation === category}
                />
                <label htmlFor={category}>{category}</label>
              </div>
            );
          })}
        </div>
        <p>sometexts</p>
        <div className="grid">
          <div className="col-6">
            <div className="col-12">
              <label>Upload Formation Details</label>
            </div>

            <div className="uploadbox">
              <FileUpload
                mode="basic"
                chooseLabel="Upload"
                name="demo[]"
                url="https://primefaces.org/primereact/showcase/upload.php"
                accept="image/*"
                multiple
                maxFileSize={1000000}
                emptyTemplate={
                  <p className="m-0">Drag and drop files to here to upload.</p>
                }
              />
            </div>
          </div>
          <div className="col-6">
            <div className="col-12">
              <label htmlFor="description">Description</label>
            </div>

            <InputTextarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              cols={15}
            />
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

export default Formulation;

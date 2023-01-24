import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../Store/store";
import { packagingCategories } from "../Data/Data";
import { materialSelect } from "../Data/Data";
import { containerSelect } from "../Data/Data";
import Topbar from "../Layout/Topbar";
import { Divider } from "primereact/divider";
import StepNavigation from "../Component/Steps/StepNavigation";
import { RadioButton } from "primereact/radiobutton";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { FileUpload } from "primereact/fileupload";

const Packaging = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [packaging, setPackaging] = useState(packagingCategories[0]);
  const [materialType, setMaterialType] = useState("");
  const [containerType, setContainerType] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fillData = () => {
      const { packaging, materialType, containerType, description } =
        auth.currentData;
      setPackaging(packaging);
      setMaterialType(materialType);
      setContainerType(containerType);
      setDescription(description);
    };
    if (auth.currentData !== null) {
      fillData();
    }
  }, [auth.currentData]);

  useEffect(() => {
    if (materialType !== "" && containerType !== "" && description !== "")
      auth.ChangeFormValid();
  });

  const handleSave = () => {
    const obj = { packaging, materialType, containerType, description };
    if (auth.formType === "Add") {
      auth.AddProject(obj);
      navigate("/projects/launch");
      auth.setProjectSteps(4);
    } else {
      auth.updateProject(obj, auth.currentData.id);
      navigate("/projects/review");
    }
    resetForm();
  };

  const resetForm = () => {
    setPackaging(packagingCategories[0]);
    setMaterialType("");
    setContainerType("");
    setDescription("");
  };

  return (
    <div className="packaging">
      <Topbar heading="New Project" title={<StepNavigation />} />
      <div className="col-6 col-offset-1 md:col-6 mt-1">
        <div className="packaging-heading">
          <h4 className="heading">Packaging</h4>
          <Divider />
        </div>
        <div className="grid">
          {packagingCategories.map((category, index) => {
            return (
              <div key={index} className="field-radiobutton col">
                <RadioButton
                  inputId={index}
                  name="category"
                  value={category}
                  onChange={(e) => setPackaging(e.value)}
                  checked={packaging === category}
                />
                <label htmlFor={category}>{category}</label>
              </div>
            );
          })}
        </div>
        <div className="grid mb-2 mt-2">
          <div className="col-12">
            <label htmlFor="formulation">Container Type</label>
          </div>
          <div className="col-6">
            <Dropdown
              id="formulation"
              className="w-full"
              value={containerType}
              options={containerSelect}
              onChange={(e) => setContainerType(e.value)}
              optionLabel="label"
              editable
            />
          </div>
        </div>
        <div className="grid">
          <div className="col-12">
            <label htmlFor="quantity">Material Type</label>
          </div>
          <div className="col-6">
            <Dropdown
              id="quantity"
              className="w-full"
              value={materialType}
              options={materialSelect}
              onChange={(e) => setMaterialType(e.value)}
              optionLabel="label"
              editable
            />
          </div>
        </div>
        <div className="grid">
          <div className="col">
            <div className="col-12">
              <label htmlFor="upload">Upload Design</label>
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
                // onUpload={onUpload}
                emptyTemplate={
                  <p className="m-0">Drag and drop files to here to upload.</p>
                }
              />
            </div>
          </div>
          <div className="col">
            <div className="col-12">
              <label htmlFor="description">Description</label>
            </div>

            <InputTextarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              cols={25}
            />
          </div>
        </div>

        <div className="col-10">
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

export default Packaging;

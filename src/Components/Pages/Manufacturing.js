import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import React, { useEffect, useState } from "react";
import StepNavigation from "../Component/Steps/StepNavigation";
import Topbar from "../Layout/Topbar";
import useAuth from "../Store/store";
import { manufacturingCategories } from "../Data/Data";
import { procurementCategories } from "../Data/Data";
import { useNavigate } from "react-router-dom";
import { RadioButton } from "primereact/radiobutton";
import { formulationSelectItems } from "../Data/Data";
import { quantitySelectItems } from "../Data/Data";
import { Dropdown } from "primereact/dropdown";

const Manufacturing = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [manufacturing, setManufacturing] = useState(
    manufacturingCategories[0]
  );
  const [formulation, setFormulation] = useState("");
  const [quantity, setQuantity] = useState("");
  const [procurement, setProcurement] = useState(procurementCategories[0]);

  useEffect(() => {
    const fillData = () => {
      const { manufacturing, formulation, quantity, procurement } =
        auth.currentData;
      setManufacturing(manufacturing);
      setFormulation(formulation);
      setQuantity(quantity);
      setProcurement(procurement);
    };
    if (auth.currentData !== null) {
      fillData();
    }
  }, [auth.currentData]);

  useEffect(() => {
    if (formulation !== "" && quantity !== "") auth.ChangeFormValid();
  });

  const handleSave = () => {
    const obj = { manufacturing, formulation, quantity, procurement };
    if (auth.formType === "Add") {
      auth.AddProject(obj);
      navigate("/projects/packaging");
      auth.setProjectSteps(3);
    } else {
      auth.updateProject(obj, auth.currentData.id);
      navigate("/projects/review");
    }
    resetForm();
  };

  const resetForm = () => {
    setManufacturing(manufacturingCategories[0]);
    setFormulation("");
    setQuantity("");
    setProcurement(procurementCategories[0]);
  };

  return (
    <div className="manufacturing">
      <Topbar heading="New Project" title={<StepNavigation />} />
      <div className="col-4 col-offset-1 md:col-4 mt-1">
        <div className="manufacturing-heading">
          <h4 className="heading">Manufacturing</h4>
          <Divider />
        </div>
        <div className="grid">
          {manufacturingCategories.map((category, index) => {
            return (
              <div key={index} className="field-radiobutton col">
                <RadioButton
                  inputId={index}
                  name="category"
                  value={category}
                  onChange={(e) => setManufacturing(e.value)}
                  checked={manufacturing === category}
                />
                <label htmlFor={category}>{category}</label>
              </div>
            );
          })}
        </div>
        <div className="field mb-2 mt-2">
          <label htmlFor="formulation">Formulation</label>
          <Dropdown
            id="formulation"
            className="w-full"
            value={formulation}
            options={formulationSelectItems}
            onChange={(e) => setFormulation(e.value)}
            optionLabel="label"
            editable
          />
        </div>
        <div className="field">
          <label htmlFor="quantity">Quantity</label>
          <Dropdown
            id="quantity"
            className="w-full"
            value={quantity}
            options={quantitySelectItems}
            onChange={(e) => setQuantity(e.value)}
            optionLabel="label"
            editable
          />
        </div>
        <div className="field">
          <label>Procurement process</label>

          {procurementCategories.map((category, index) => {
            return (
              <div key={index} className="field-radiobutton col">
                <RadioButton
                  inputId={index}
                  name="category"
                  value={category}
                  onChange={(e) => setProcurement(e.value)}
                  checked={procurement === category}
                />
                <label htmlFor={category}>{category}</label>
              </div>
            );
          })}
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

export default Manufacturing;

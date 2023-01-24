import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import Topbar from "../Layout/Topbar";
import { projectTypes } from "../Data/Data";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import useAuth from "../Store/store";
import { useNavigate } from "react-router-dom";

const Project = () => {
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [client, setClient] = useState([""]);
  const auth = useAuth();

  useEffect(() => {
    if (name.trim() !== "" && type.trim() !== "" && client[0].trim() !== "")
      auth.ChangeFormValid();
  });

  const handleCreate = () => {
    const obj = { projectName: name, projectType: type, clientPOC: client };
    auth.AddProject(obj);
    navigate("/projects/formulation");
    auth.setProjectSteps(0);
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setType("");
    setClient([""]);
  };

  const AddClient = () => {
    setClient([...client, ""]);
  };

  const handleClient = (e) => {
    setClient((arr) => {
      let index = e.target.id;
      let newClient = arr.slice();
      newClient[index] = e.target.value;
      return newClient;
    });
  };

  const handleRemove = (id) => {
    let newClient = client.filter((_, index) => id !== index);
    setClient(newClient);
  };

  return (
    <>
      <Topbar heading="New Project" title="Start a new project" />
      <div className="col-4 col-offset-1 md:col-4 mt-3">
        <div className="project">
          <div className="field">
            <label htmlFor="projectName">Project Name</label>
            <InputText
              className="w-full"
              id="projectName"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="projectType">Project Type</label>
            <Dropdown
              id="projectType"
              className="w-full"
              value={type}
              options={projectTypes}
              onChange={(e) => setType(e.value)}
              optionLabel="label"
              editable
            />
          </div>
          <div className="field">
            <label htmlFor="client">Client POC</label>
            {client.map((_, index) => (
              <div className="p-inputgroup">
                <InputText
                  key={index}
                  className="w-full mb-3"
                  id={index}
                  value={client[index]}
                  onChange={handleClient}
                />
                <Button
                  icon="pi pi-times"
                  className="p-button-danger mb-3"
                  onClick={() => handleRemove(index)}
                  disabled={client.length < 2}
                />
              </div>
            ))}
          </div>
          {client.length < 3 && (
            <i
              className="pi pi-plus-circle mb-5"
              style={{ color: "blue" }}
              onClick={AddClient}
            >
              <span className="ml-2">Add another</span>
            </i>
          )}
          <Button
            label="Create Project"
            onClick={handleCreate}
            disabled={auth.formValid}
          />
        </div>
      </div>
    </>
  );
};

export default Project;

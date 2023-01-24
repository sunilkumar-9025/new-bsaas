import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import useAuth from "../Store/store";

const Acknowledgement = () => {
  const [displayBasic, setDisplayBasic] = useState(true);
  const navigate = useNavigate();
  const auth = useAuth();
  const handleLauch = () => {
    auth.launchProject();
    navigate("/projects/existingProject");
  };

  const renderFooter = () => {
    return (
      <Button
        label="Continue"
        icon="pi pi-check"
        onClick={handleLauch}
        autoFocus
      />
    );
  };

  return (
    <div className="ack">
      <Dialog
        header="Thank you for launching  your project at Bsaas"
        visible={displayBasic}
        style={{ width: "50vw" }}
        footer={renderFooter("displayBasic")}
      >
        <ul>
          <li>
            You can track your project in the <span>existing project </span>
            section
          </li>
          <li>Our team will reach out to you within 48 hrs</li>
        </ul>
      </Dialog>
    </div>
  );
};

export default Acknowledgement;

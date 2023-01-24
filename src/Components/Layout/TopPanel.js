import React from "react";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Notification from "../Component/Notification";
import Message from "../Component/Message";
import AvatarLogo from "../Component/AvatarLogo";
const TopPanel = () => {
  const items = [];

  const start = (
    <div className="col-12">
      <div className="p-inputgroup">
        <InputText placeholder="Search..." />
        <Button icon="pi pi-search" className="p-button-secondary" />
      </div>
    </div>
  );
  const end = (
    <div className="flex justify-content-between align-items-center">
      <Notification />
      <Message />
      <AvatarLogo />
    </div>
  );

  return (
    <div>
      <div className="card">
        <Menubar model={items} start={start} end={end} />
      </div>
    </div>
  );
};

export default TopPanel;

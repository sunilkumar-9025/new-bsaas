import React, { useRef } from "react";
import { Avatar } from "primereact/avatar";
import { OverlayPanel } from 'primereact/overlaypanel';

const AvatarLogo = () => {
  const op = useRef(null);
  return (
    <>
      <Avatar label="P" className="mr-4 p-auto" style={{cursor:'ponter'}} onClick={(e) => op.current.toggle(e)}/>
      <OverlayPanel
        ref={op}
        showCloseIcon
        id="overlay_panel"
        style={{ width: "200px" }}
        className="overlaypanel-demo"
      ></OverlayPanel>
      {/* <p className="mr-4">Satish</p> */}
    </>
  );
};

export default AvatarLogo;

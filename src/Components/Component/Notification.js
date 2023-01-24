import React, { useRef } from "react";
import { Badge } from "primereact/badge";
import { OverlayPanel } from "primereact/overlaypanel";
const Notification = () => {
  const op = useRef(null);
  return (
    <>
      <i
        className="pi pi-bell mr-4 p-text-secondary p-overlay-badge"
        onClick={(e) => op.current.toggle(e)}
      >
        <Badge value="2"></Badge>
      </i>
      <OverlayPanel
        ref={op}
        showCloseIcon
        id="overlay_panel"
        style={{ width: "200px" }}
        className="overlaypanel-demo"
      ></OverlayPanel>
    </>
  );
};

export default Notification;

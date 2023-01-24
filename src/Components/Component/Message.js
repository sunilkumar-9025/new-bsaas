import React, { useRef } from "react";
import { Badge } from "primereact/badge";
import { OverlayPanel } from "primereact/overlaypanel";

const Message = () => {
  const op = useRef(null);
  return (
    <>
      <i
        className="pi pi-envelope p-text-secondary p-overlay-badge mr-4"
        style={{ cursor: "pointer" }}
        onClick={(e) => op.current.toggle(e)}
      >
        <Badge severity="danger"></Badge>
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

export default Message;

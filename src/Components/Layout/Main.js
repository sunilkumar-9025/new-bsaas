import React from "react";
import { Outlet } from "react-router-dom";
import SideNavbar from "./SideNavbar";
import TopPanel from "./TopPanel";

const Main = () => {
  return (
    <div className="app">
      <div className="grid">
        <div className="col-2 bg-blue-600 min-h-screen p-0">
          <SideNavbar />
        </div>
        <div className="col-10 p-0">
          <TopPanel />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Main;

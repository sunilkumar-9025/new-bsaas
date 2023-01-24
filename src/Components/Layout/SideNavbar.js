import React from "react";
import { useNavigate } from "react-router-dom";
import { PanelMenu } from "primereact/panelmenu";

const SideNavbar = () => {
  const navigate = useNavigate();
  const SidebarMenuList = [
    {
      label: "Dashboard",
      icon: "pi pi-th-large",
      command: () => navigate("/"),
    },
    {
      label: "Projects",
      items: [
        {
          label: "Projects",
          icon: "pi pi-fw pi-file",
          command: () => navigate("projects"),
        },
        {
          label: "Existing Project",
          icon: "pi pi-fw pi-file",
          command: () => navigate("projects/existingProject"),
        },
        {
          label: "Drafts",
          icon: "pi pi-fw pi-file",
          command: () => navigate("projects/drafts"),
        },
      ],
    },
    {
      label: "Reports",
      icon: "pi pi-th-large",
      command: () => navigate("reports"),
    },
    {
      label: "Consulting",
      icon: "pi pi-th-large",
      command: () => navigate("consulting"),
    },
    {
      label: "Formulation Library",
      icon: "pi pi-th-large",
      command: () => navigate("formulationLibrary"),
    },
    {
      label: "Tickets",
      icon: "pi pi-th-large",
      command: () => navigate("tickets"),
    },
  ];

  return (
    <div className="flex flex-column mt-8 align-items-center   ">
      <h1 className="text-white">BSAAS</h1>
      <PanelMenu className="sidepanel" model={SidebarMenuList} />
    </div>
  );
};

export default SideNavbar;

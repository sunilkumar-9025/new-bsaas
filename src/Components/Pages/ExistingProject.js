import React, { useState } from "react";
import useAuth from "../Store/store";
import { DataTable } from "primereact/datatable";
import { useEffect } from "react";
import { Column } from "primereact/column";
import { nanoid } from "nanoid";
import { customAlphabet } from "nanoid";
import Topbar from "../Layout/Topbar";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const ExistingProject = () => {
  const navigate = useNavigate();
  const nanoid = customAlphabet("1234567890", 5);
  const auth = useAuth();
  const [data, setData] = useState();

  const addDays = (period) => {
    let date = new Date();
    let d = date.setDate(date.getDate() + period);
    return new Date(d);
  };
  useEffect(() => {
    let data = auth.projects.map((element) => {
      let pocName = "";
      for (let i = 0; i < element[0].clientPOC?.length; i++) {
        pocName = pocName + " " + element[0].clientPOC[i];
      }
      return {
        id: nanoid(),
        projectName: element[0].projectName,
        projectType: element[0].projectType,
        poc: pocName,
        ETA: addDays(15).toDateString(),
        status: "pending...",
      };
    });
    setData(data);
  }, [auth.projects]);

  const title = (
    <>
      <Button
        label="New project"
        icon="pi pi-plus"
        className="mr-3"
        onClick={() => navigate("/projects")}
      />
      <Button
        label="Filter"
        className="p-button-outlined p-button-secondary"
        icon="pi pi-filter"
      />
    </>
  );

  return (
    <div className="existing">
      <Topbar heading="Existing Project" title={title} />
      <div className="grid">
        <div className="col-10 col-offset-1">
          <h3>Table</h3>
          <DataTable
            value={data}
            responsiveLayout="scroll"
            paginator
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} projects"
            paginatorTemplate="PrevPageLink PageLinks NextPageLink RowsPerPageDropdown CurrentPageReport"
            dataKey="id"
            emptyMessage="No data found"
            className="datatable-responsive"
            rows={10}
            showGridlines
          >
            <Column field="id" sortable header="Project Id"></Column>
            <Column field="projectName" sortable header="Project Name"></Column>
            <Column field="projectType" sortable header="Project Type"></Column>
            <Column field="ETA" header="ETA"></Column>
            <Column field="poc" sortable header="POC"></Column>
            <Column field="status" sortable header="Status"></Column>
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default ExistingProject;

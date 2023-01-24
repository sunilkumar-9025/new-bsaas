import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./Components/Layout/Main";
import Projects from "./Components/Layout/Projects";
import Project from "./Components/Pages/Project";
import Dashboard from "./Components/Pages/Dashboard";
import Formulation from "./Components/Pages/Formulation";
import Testing from "./Components/Pages/Testing";
import Manufacturing from "./Components/Pages/Manufacturing";
import Packaging from "./Components/Pages/Packaging";
import Launch from "./Components/Pages/Launch";
import Review from "./Components/Pages/Review";
import Acknowledgement from "./Components/Pages/Acknowledgement";
import ExistingProject from "./Components/Pages/ExistingProject";
import Drafts from "./Components/Pages/Drafts";
import FormulationLibrary from "./Components/Pages/FormulationLibrary";
import Reports from "./Components/Pages/Reports";
import Tickets from "./Components/Pages/Tickets";
import Consulting from "./Components/Pages/Consulting";
import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<Dashboard />} />
        <Route path="/projects" element={<Projects />}>
          <Route index element={<Project />} />
          <Route path="formulation" element={<Formulation />} />
          <Route path="testing" element={<Testing />} />
          <Route path="manufacturing" element={<Manufacturing />} />
          <Route path="packaging" element={<Packaging />} />
          <Route path="launch" element={<Launch />} />
          <Route path="review" element={<Review />} />
          <Route path="acknowledgement" element={<Acknowledgement />} />
          <Route path="existingProject" element={<ExistingProject />} />
          <Route path="drafts" element={<Drafts />} />
        </Route>
        <Route path="/formulationLibrary" element={<FormulationLibrary />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/consulting" element={<Consulting />} />
      </Route>
    </Routes>
  );
};

export default App;

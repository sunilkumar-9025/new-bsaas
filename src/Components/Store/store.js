import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [project, setProject] = useState([]);
  const [formValid, setFormValid] = useState(true);
  const [projectSteps, setProjectSteps] = useState(0);
  const [formType, setFormType] = useState("Add");
  const [currentData, setCurrentData] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    let projects = JSON.parse(localStorage.getItem("projects"));
    projects?.length > 0 ? setProjects(projects) : setProjects([]);
  }, []);

  const AddProject = (obj) => {
    setProject([...project, obj]);
    setFormValid(true);
  };

  const ChangeFormValid = () => {
    setFormValid(false);
  };

  const selectData = (id) => {
    setFormType("Update");
    const data = project[id];
    data.id = id;
    setCurrentData(data);
  };

  const updateProject = (obj, id) => {
    let newProject = [...project];
    newProject[id] = obj;
    setProject(newProject);
    setFormType("Add");
  };

  const launchProject = () => {
    setProjects([...projects, project]);
    setProject([]);
    localStorage.setItem("projects", JSON.stringify([...projects, project]));
  };
  return (
    <AuthContext.Provider
      value={{
        project,
        AddProject,
        formValid,
        ChangeFormValid,
        projectSteps,
        selectData,
        currentData,
        updateProject,
        formType,
        setProjectSteps,
        launchProject,
        projects,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;

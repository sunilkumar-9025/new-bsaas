import React from "react";
import Steps from "./Steps";
import './StepNavigation.css'
import {labelArray} from '../../Data/Data'
import useAuth from "../../Store/store";
const StepNavigation = () => {
  const auth = useAuth()
  return (
    <div className="stepWrapper">
      {labelArray.map((item, index) => (
        <Steps
          key={index}
          index={index}
          label={item.label}
          path={item.path}
          selected={auth.projectSteps > index }
        ></Steps>
      ))}
    </div>
  );
};

export default StepNavigation;
  
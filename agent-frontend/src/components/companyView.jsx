import React from "react";
import RegisteredLayout from "./registeredLayout";

const CompanyView = (props) => {
  return (
    <div>
      <RegisteredLayout profile={props.user} />
    </div>
  );
};

export default CompanyView;

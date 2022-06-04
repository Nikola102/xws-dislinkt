import React from "react";
import RegisteredLayout from "./registeredLayout";

const Company = (props) => {
  return (
    <div>
      <RegisteredLayout profile={props.user} />
      <h1 style={{ color: "white" }}>Pozdrav za {props.user.email}</h1>
    </div>
  );
};

export default Company;

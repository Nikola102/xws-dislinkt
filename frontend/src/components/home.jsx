import React from "react";
import Layout from "./layout";
import RegisteredLayout from "./registeredLayout";
const Home = (props) => {
  let username = sessionStorage.getItem("username");
  return (
    <div>
      {username && <RegisteredLayout />}
      {!username && <Layout handler={props.handler} />}
    </div>
  );
};

export default Home;

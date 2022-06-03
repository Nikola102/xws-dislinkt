import React from "react";
import Layout from "./layout";
const Home = (props) => {
  let username = sessionStorage.getItem("username");
  const helper = () => {
    sessionStorage.clear();
  };
  return (
    <div className={"background"}>
      {(username === undefined || !username) && (
        <Layout handler={props.handler} />
      )}
      {username && helper() && <Layout handler={props.handler} />}
    </div>
  );
};

export default Home;

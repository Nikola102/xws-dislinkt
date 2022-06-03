import React from "react";
import Layout from "./layout";
const Home = () => {
  let username = sessionStorage.getItem("username");
  const helper = () => {
    sessionStorage.clear();
  };
  return (
    <div className={"background"}>
      {(username === undefined || !username) && <Layout />}
      {username && helper() && <Layout />}
      <div className={"bottom-title"}>
        <h1 id="dislinkt-title">Agent Dislinkt</h1>
      </div>
    </div>
  );
};

export default Home;

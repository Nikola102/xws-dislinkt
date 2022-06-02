import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import RegisteredLayout from "./registeredLayout";

const Search = () => {
  let [searchedUsers, setSearchedUsers] = useState([]);
  const search = useLocation().search;
  const username = new URLSearchParams(search).get("username");
  async function searchForUsers() {
    const response = await fetch(
      "http://localhost:8088/user/search/" + username,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
    const body = await response.json();
    setSearchedUsers(body);
  }
  useEffect(() => {
    searchForUsers();
  }, []);
  return (
    <div>
      <p>{username}</p>
    </div>
  );
};

export default Search;

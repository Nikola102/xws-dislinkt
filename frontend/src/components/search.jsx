import React from "react";
import { useLocation } from "react-router-dom";
import RegisteredLayout from "./registeredLayout";

const Search = (props) => {
  const search = useLocation().search;
  const name = new URLSearchParams(search).get("name");
  return (
    <div>
      <p>{name}</p>
    </div>
  );
};

export default Search;

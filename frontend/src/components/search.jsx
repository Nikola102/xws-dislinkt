import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import RegisteredLayout from "./registeredLayout";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";

const Search = (props) => {
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
      <RegisteredLayout profile={props.user} />
      <div className={"profile-list"}>
        <h3 className={"profile-list-h3"}>People</h3>
        {searchedUsers.map((profile) => (
          <div key={profile.id} className={"public-profile"}>
            <Image
              className={"profile-image"}
              rounded
              src="user.png"
              width="60"
              height="60"
              align="left"
            />
            <Link className={"profile-link"} to={"/" + profile.username}>
              {profile.name + " " + profile.surname}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;

import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PublicProfiles = (props) => {
  let [profiles, setProfiles] = useState([]);
  useEffect(() => {
    setProfiles(props.profiles);
  }, [props.profiles]);
  return (
    <div>
      {profiles.map((profile) => (
        <div key={profile.id}>
          <img alt={profile.username} />
          <Link to={"/" + profile.username}>
            {profile.name + " " + profile.lastname}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PublicProfiles;

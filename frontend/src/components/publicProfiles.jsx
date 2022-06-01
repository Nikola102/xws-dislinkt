import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";

const PublicProfiles = (props) => {
  let [profiles, setProfiles] = useState([]);
  useEffect(() => {
    setProfiles(props.profiles);
  }, [props.profiles]);

  if (profiles.length !== 0) {
    return (
      <div className={"profile-list"}>
        <h3 className={"profile-list-h3"}>People</h3>
        {profiles.map((profile) => (
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
    );
  } else {
    return;
  }
};

export default PublicProfiles;

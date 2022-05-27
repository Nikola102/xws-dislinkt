import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";

const PublicProfiles = (props) => {
  let [profiles, setProfiles] = useState([]);
  useEffect(() => {
    setProfiles(props.profiles);
  }, [props.profiles]);
  return (
    <div>
      {profiles.map((profile) => (
        <Container>
          <img alt={profile.username} />
          <Link to={profile.username}>
            {profile.name + " " + profile.lastname}
          </Link>
        </Container>
      ))}
    </div>
  );
};

export default PublicProfiles;

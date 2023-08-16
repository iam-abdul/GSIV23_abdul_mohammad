import React from "react";
import classes from "./header.module.css";
import { Routes, Route } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
const Header: React.FunctionComponent = () => {
  const HeaderWithSearchBar: React.FunctionComponent = () => {
    return (
      <div className={classes.search_bar}>
        <SearchIcon
          className={classes.search_icon}
          style={{ color: "#9b9b9b" }}
        />
        <input type="text" placeholder="Search" />
      </div>
    );
  };

  const HeaderWithDetailsHeading: React.FunctionComponent = () => {
    return <h3 className={classes.movie_details}>Movie Details</h3>;
  };

  return (
    <div className={classes.parent}>
      <Routes>
        <Route path="/" element={<HeaderWithSearchBar />} />
        <Route path="/details" element={<HeaderWithDetailsHeading />} />
      </Routes>
      <HomeIcon style={{ color: "#4A4A4A" }} />
    </div>
  );
};

export default Header;

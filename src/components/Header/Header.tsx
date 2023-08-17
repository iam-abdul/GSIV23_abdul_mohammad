import React, { useEffect, useState } from "react";
import classes from "./header.module.css";
import { Routes, Route } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
const Header: React.FunctionComponent = () => {
  const [searchParams] = useSearchParams();
  const queryFromURL = searchParams.get("query");
  const navigate = useNavigate();
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    if (queryFromURL) {
      setQuery(queryFromURL);
    }
  }, [queryFromURL]);

  const onSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      navigate("/search?query=" + query);
      setQuery("");
    }
  };

  const searchBar = (
    <div className={classes.search_bar}>
      <SearchIcon
        className={classes.search_icon}
        style={{ color: "#9b9b9b" }}
      />
      <input
        onChange={onSearchInput}
        value={query}
        type="text"
        placeholder="Search"
        onKeyDown={handleKeyPress}
      />
    </div>
  );

  const HeaderWithDetailsHeading: React.FunctionComponent = () => {
    return <h3 className={classes.movie_details}>Movie Details</h3>;
  };

  return (
    <div className={classes.parent}>
      <Routes>
        <Route path="/" element={searchBar} />
        <Route path="/search" element={searchBar} />
        <Route path="/details" element={<HeaderWithDetailsHeading />} />
      </Routes>
      <HomeIcon
        onClick={() => {
          navigate("/");
        }}
        style={{ color: "#4A4A4A", cursor: "pointer" }}
      />
    </div>
  );
};

export default Header;

import React, { useState } from "react";
import { getMoviesService } from "../../services/services";
import "./style.css";

export const SearchComponent = ({ getMovies }) => {
  const [searchParam, setSearchParam] = useState("");
  const searchMovies = (e) => {
    e.preventDefault();
    getMoviesService(searchParam).then((res) => {
      getMovies([...res.data.results]);
    });
  };
  return (
    <form className="search-bar" onSubmit={searchMovies}>
      <input
        type="text"
        placeholder="search"
        value={searchParam}
        onChange={(e) => setSearchParam(e.target.value)}
        className="search-bar-input"
      />
      <button type="submit" className="button-primary search-bar-button">
        Search
      </button>
    </form>
  );
};

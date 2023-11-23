import React, { useState } from "react";
import { getMoviesService } from "../services/services";

function Search({ searchKey, setSearchKey, searchMovies }) {
  const handleSearch = (e) => {
    e.preventDefault();
    searchMovies(e);
  };
  return (
    <div>
      <form className="container mb-4" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="search"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export const NewSearchComponent = ({ getMovies }) => {
  const [searchParam, setSearchParam] = useState("");
  const searchMovies = (e) => {
    e.preventDefault();
    getMoviesService(searchParam).then((res) => {
      console.log(res.data);
      getMovies({...res.data});
    });
  };
  return (
    <div>
      <form className="container mb-4" onSubmit={searchMovies}>
        <input
          type="text"
          placeholder="search"
          value={searchParam}
          onChange={(e) => setSearchParam(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Search;

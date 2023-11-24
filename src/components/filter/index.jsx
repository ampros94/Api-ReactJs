import { useEffect, useState } from "react";
import { getGenres, searchWithKeyword } from "../../services/services";

import "./style.css";

export const FilterComponent = ({ getMovies }) => {
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    getGenres().then((res) => setGenres(res.data.genres));
  }, [getGenres]);
  const getFilterSelected = (e) => {
    const word = e.target.value;
    searchWithKeyword(word).then((res) => {
      getMovies(res.data.results);
    });
  };
  return (
    <select
      className="filter"
      getMovies={getMovies}
      onChange={getFilterSelected}
    >
      {genres.map((option, i) => (
        <option value={option.name} key={i}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

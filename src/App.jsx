import { useEffect, useState } from "react";
import "./App.css";

import { getDiscoverMovies } from "./services/services.js";

import { NavBarComponent } from "./components/navBar";
import { ListComponent } from "./components/listMovies/index.jsx";
import { TrailerPreviewComponent } from "./components/trailerPreview/trailerPreview.jsx";
import { LoaderComponent } from "./components/loader/loader.jsx";

export const App = () => {
  const [movies, setMovies] = useState([]);
  const [pages, setPages] = useState(0);
  const nextList = () => {
    getDiscoverMovies(pages + 1).then((res) => {
      setMovies(movies.concat(res.data.results));
      setPages(res.data.page);
    });
  };
  useEffect(() => {
    getDiscoverMovies().then((res) => {
      setMovies(res.data.results);
      setPages(res.data.page);
    });
  }, [getDiscoverMovies]);
  return (
    <section>
      <NavBarComponent searchMovies={setMovies} />
      {movies[0] ? (
        <TrailerPreviewComponent movie={movies[0]} />
      ) : (
        <LoaderComponent />
      )}
      <div>
        <ListComponent movies={movies} />
        <button className="button-primary" onClick={nextList}>
          Load more
        </button>
      </div>
    </section>
  );
};

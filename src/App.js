import React, { useEffect, useState } from "react";
import Axios from "axios";
import YouTube from "react-youtube";
import Navbar from "./components/navbar.jsx";
import Search, { NewSearchComponent } from "./components/search.jsx";
import Pagination from "./components/pagination.jsx";
import GenreFilter from "./components/filter";
import "./App.css";
import { API_KEY, API_URL, URL_IMAGE, ITEMS_PER_PAGE } from "./utils/consts.js";
import { ListMoviesComponent } from "./components/listMovies.jsx";
import { TrailerPreviewComponent } from "./components/trailerPreview/trailerPreview.jsx";
import { LoaderComponent } from "./components/loader/loader.jsx";

function App() {
  // Variables de estado
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState({ title: "loading movies" });
  const [playing, setPlaying] = useState(false);

  const [selectedGenre, setSelectedGenre] = useState("");

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
  };

  const fetchMovies = async (searchKey, page = 1, genreId = "") => {
    const type = searchKey ? "search" : "discover";

    try {
      const response = await Axios.get(`${API_URL}/${type}/movie`, {
        params: {
          api_key: API_KEY,
          query: searchKey,
          page: page,
          with_genres: genreId,
        },
      });

      const {
        data: { results, total_pages },
      } = response;
      const paginatedResults = results.slice(0, ITEMS_PER_PAGE);
      setMovies(paginatedResults);
      setTotalPages(total_pages);
      setCurrentPage(page);
      setMovie(
        paginatedResults.length > 0
          ? paginatedResults[0]
          : { title: "No movies found" }
      );

      if (results.length > 0) {
        await fetchMovie(results[0].id);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const fetchMovie = async (id) => {
    const { data } = await Axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "videos",
      },
    });

    if (data.videos && data.videos.results) {
      const trailer = data.videos.results.find(
        (vid) => vid.name === "Official Trailer"
      );
      setTrailer(trailer ? trailer : data.videos.results[0]);
    }
    setMovie(data);
  };

  const selectMovie = async (movie) => {
    fetchMovie(movie.id);
    setMovie(movie);
    window.scrollTo(0, 0);
  };

  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies(searchKey);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const pagesMovies = async (searchKey, page = 1) => {
    const type = searchKey ? "search" : "discover";

    try {
      const response = await Axios.get(`${API_URL}/${type}/movie`, {
        params: {
          api_key: API_KEY,
          query: searchKey,
          page: page,
        },
      });

      const {
        data: { results, total_pages },
      } = response;
      setMovies(results);
      setTotalPages(total_pages);
      setCurrentPage(page);
      setMovie(results.length > 0 ? results[0] : { title: "No movies found" });
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    fetchMovies(searchKey, pageNumber);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      <h2 className="text-center mt-5 mb-5">Trailer Movies</h2>
      {/* <Search
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        searchMovies={searchMovies}
      /> */}
      <NewSearchComponent getMovies={setMovies} />

      <div>
        <main>
          {/* {movie ? (
            <div
              className="viewtrailer"
              style={{
                backgroundImage: `url(${URL_IMAGE}${movie.backdrop_path})`,
              }}
            >
              {playing ? (
                <>
                  <YouTube
                    videoId={trailer.key}
                    className="reproductor container"
                    opts={{
                      width: "100%",
                      height: "100%",
                      playerVars: {
                        autoplay: 1,
                        controls: 0,
                        cc_load_policy: 0,
                        fs: 0,
                        iv_load_policy: 0,
                        rel: 0,
                        showinfo: 0,
                      },
                    }}
                  />
                  <button onClick={() => setPlaying(false)} className="boton">
                    close
                  </button>
                </>
              ) : (
                <div className="container">
                  <div className="">
                    {trailer ? (
                      <button
                        className="boton"
                        onClick={() => setPlaying(true)}
                        type="button"
                      >
                        Play Trailer
                      </button>
                    ) : (
                      "Sorry, no trailer is available"
                    )}
                    <h1 className="text-white">{movie.title}</h1>
                    <p className="text-white">{movie.overview}</p>
                  </div>
                </div>
              )}
            </div>
          ) : null} */}
          {movies[0] ? <TrailerPreviewComponent movie={movies[0]}/> : <LoaderComponent/>}
        </main>
      </div>

      {/* <GenreFilter onSelectGenre={handleGenreChange} /> */}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <ListMoviesComponent movies={movies} />
    </div>
  );
}

export default App;

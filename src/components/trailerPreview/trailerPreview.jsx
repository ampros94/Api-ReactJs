import { useEffect, useState } from "react";
import { URL_IMAGE } from "../../utils/consts";
import { getMovieService } from "../../services/services";
import "./style.css";
import { getKey } from "../../utils/functions";
import { PlayerComponent } from "../player";

export const TrailerPreviewComponent = ({ movie }) => {
  const [trailer, setTrailer] = useState({ isPlaying: false, key: "" });
  useEffect(() => {
    getMovieService(movie.id).then((res) => {
      setTrailer({ ...trailer, key: getKey(res.data) });
    });
  }, [movie]);
  return (
    <div
      className="viewtrailer"
      style={{
        backgroundImage: `url(${URL_IMAGE}${movie.backdrop_path})`,
        backgroundSize: "cover",
      }}
    >
      {trailer.isPlaying ? (
        <>
          <PlayerComponent videoId={trailer.key} />
          <button
            onClick={() => setTrailer({ ...trailer, isPlaying: false })}
            className="button-primary close"
          >
            close
          </button>
        </>
      ) : (
        <div className="banner-info">
          <h1 className="text-white">{movie.title}</h1>
          <p className="text-white">{movie.overview}</p>
          {trailer.key && (
            <button
              className="button-primary"
              onClick={() => setTrailer({ ...trailer, isPlaying: true })}
              type="button"
            >
              Play Trailer
            </button>
          )}
        </div>
      )}
    </div>
  );
};

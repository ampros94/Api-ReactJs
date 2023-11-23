import { useEffect, useState } from "react";
import { URL_IMAGE } from "../../utils/consts";
import YouTube from "react-youtube";
import { getMovieService } from "../../services/services";

export const TrailerPreviewComponent = ({ movie }) => {
  const [trailer, setTrailer] = useState({ isPlaying: false, key: "" });
  const getKey = (data)=>{
    const {videos} = data;
    const {results} = videos;
    const videosFiltered = results.filter(video=>video.name.includes("Official Trailer"));
    return videosFiltered[0].key;
  }
  useEffect(() => {
    getMovieService(movie.id).then((res) => {
        setTrailer({...trailer, key: getKey(res.data)});
    });
  }, [movie]);
  return (
    <div
      className="viewtrailer"
      style={{
        backgroundImage: `url(${URL_IMAGE}${movie.backdrop_path})`,
      }}
    >
      {trailer.isPlaying ? (
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
          <button
            onClick={() => setTrailer({ ...trailer, isPlaying: false })}
            className="boton"
          >
            close
          </button>
        </>
      ) : (
        <div className="container">
          <div className="">
            {trailer.key ? (
              <button
                className="boton"
                onClick={() => setTrailer({ ...trailer, isPlaying: true })}
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
  );
};

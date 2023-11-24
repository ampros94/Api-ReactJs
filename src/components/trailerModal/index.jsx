import { useEffect, useState } from "react";

import "./style.css";
import { getMovieService } from "../../services/services";
import { getKey } from "../../utils/functions";
import { PlayerComponent } from "../player";
import { LoaderComponent } from "./../loader/loader";
import { MSG_ERR } from "../../utils/consts";

export const ModalTrailer = ({ setvisible, idmovie }) => {
  const [movieTrailer, setMovieTrailer] = useState("");
  const [msgError, setMsg] = useState("");
  useEffect(() => {
    getMovieService(idmovie)
      .then((res) => {
        setMovieTrailer(getKey(res.data));
      })
      .catch((error) => setMsg(MSG_ERR[error.response.status]));
  }, [movieTrailer]);
  return (
    <div className="modal" setvisible={setvisible} idmovie={idmovie}>
      <div className="content-modal">
        {movieTrailer && movieTrailer !== undefined ? (
          <PlayerComponent videoId={movieTrailer} />
        ) : (
          <LoaderComponent msg={msgError} />
        )}
        <button className="close-modal" onClick={() => setvisible(false)}>
          X
        </button>
      </div>
    </div>
  );
};

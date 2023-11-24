import { useState } from "react";
import { URL_IMAGE } from "../../utils/consts";
import { ModalTrailer } from "../trailerModal";
import "./style.css";

export const CardComponent = ({ movie }) => {
  const [isVisible, setVisible] = useState(false);
  return (
    <>
      <div
        movie={movie}
        className="card"
        onClick={() => {
          setVisible(true);
        }}
      >
        <div className="card-wrap-img">
          <img
            src={`${URL_IMAGE}${movie.poster_path}`}
            alt={movie.title}
            className="card-img"
          />
        </div>
        <div className="card-content">
          <h2 className="card-title">
            {movie.title ? movie.title : movie.name}
          </h2>
        </div>
      </div>
      {isVisible && <ModalTrailer setvisible={setVisible} idmovie={movie.id} />}
    </>
  );
};

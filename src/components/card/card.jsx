import { URL_IMAGE } from "../../utils/consts";
import "./styles.css";

export const CardComponent = ({ onclick, movie }) => {
  return (
    <div className="col-md-4 mb-3 card" onClick={() => onclick(movie)}>
      <img
        src={`${URL_IMAGE}${movie.poster_path}`}
        alt={movie.title}
        height={600}
        width="100%"
      />
      <h4 className="text-center">{movie.title}</h4>
    </div>
  );
};

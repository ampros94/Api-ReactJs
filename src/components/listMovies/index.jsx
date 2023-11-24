import { CardComponent } from "../card";
import "./style.css";

export const ListComponent = ({ movies }) => {
  return (
    <div className="cards">
      {movies.map((movie) => (
        <CardComponent movie={movie} key={movie.id} />
      ))}
    </div>
  );
};

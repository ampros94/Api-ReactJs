import { CardComponent } from "./card/card"

export const ListMoviesComponent = ({movies})=>{
    return (
        <div className="container mt-3">
        <div className="row">
          {movies.map((movie) => (
            <CardComponent movie={movie} key={movie.id}/>
          ))}
        </div>
      </div>
    )
}
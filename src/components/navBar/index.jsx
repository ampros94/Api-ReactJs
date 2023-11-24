import "./style.css";

import { FilterComponent } from "../filter";
import { SearchComponent } from "../search";

export const NavBarComponent = ({ searchMovies }) => {
  return (
    <nav className="nav-bar">
      <div className="nav-bar-logo">
        <p className="nav-bar-logo-item">MOVIES</p>
      </div>
      <SearchComponent getMovies={searchMovies} />
      <div className="nav-bar-menu">
        <FilterComponent getMovies={searchMovies} />
      </div>
    </nav>
  );
};

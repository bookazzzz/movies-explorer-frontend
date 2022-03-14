import React from 'react'
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {
  return (
    <section className="movies-card-list">
    <div className="movies-card-list__elements">
      <MoviesCard />
    </div>
        <button className="movies-card-list__button" type="button" > Ещё </button>
</section>
  );
}

export default MoviesCardList;
import React from 'react'
import "./MoviesCard.css";
import preview from "../../images/film1.svg"

function MoviesCard() {
  return (
      <article className="movies-card">
        <div className="movies-card__container">
            <div className="movie-card__info">
                <h3 className="movies-card__name">33 слова о дизайне</h3>
                <p className="movies-card__description">1ч 47м</p>
            </div>
            <button className="movies-card__save-button" type="button"></button>
        </div>
            <img className="movies-card__images" src={preview} alt="film" />
    </article>
  );
}

export default MoviesCard;
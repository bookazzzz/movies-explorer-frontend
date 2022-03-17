import React from "react";
import "./MoviesCard.css";
import preview from "../../images/film1.svg";
import { Route, Switch } from "react-router-dom";

function MoviesCard() {
  return (
    <article className="movies-card">
      <div className="movies-card__container">
        <div className="movie-card__info">
          <h3 className="movies-card__name">33 слова о дизайне</h3>
          <p className="movies-card__description">1ч 47м</p>
        </div>
        <Switch>
          <Route path="/movies">
            <button
              className="movies-card__save-button movies-card__save-button_active"
              type="button"
            ></button>
          </Route>
          <Route path="/saved-movies">
            <button
              className="movies-card__save-button movies-card__delete-button"
              type="button"
            ></button>
          </Route>
        </Switch>
      </div>
      <img className="movies-card__images" src={preview} alt="film" />
    </article>
  );
}

export default MoviesCard;

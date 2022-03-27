import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./Movies.css";

function Movies(props) {
  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <main>
        <SearchForm
          showShortMovies={props.showShortMovies}
          checked={props.checked}
          findByNameFilm={props.findByNameFilm}
          value={props.value}
          setValue={props.setValue}
        />
        <MoviesCardList
          movies={props.moviesAction}
          newItem={props.newItem}
          addedNewCard={props.addedNewCard}
          counterCard={props.counterCard}
          changeFilterValue={props.changeFilterValue}
          isLoading={props.isLoading}
        />
      </main>
      <Footer />
    </>
  );
}

export default Movies;

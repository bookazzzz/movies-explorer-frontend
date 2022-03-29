import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./Movies.css";
import useLocalStorage from '../../hooks/useLocalStorage';

function Movies(props) {

  //состояние фильтрации короткометражки
	const [checked, setChecked] = useLocalStorage('checked', false);

	//локально фильтруем фильмы которые к нам идут из поискового стейта
	const [shortMovies, setShortMovies] = useLocalStorage('short_movies', []);

	//при определенном флаге управляем фильтрацией фильмов
	React.useEffect(() => {
		return checked ? setShortMovies(props.showShortMovies(props.movies)) : setShortMovies(props.movies);
	}, [checked, props]);

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <main>
        <SearchForm
          setChecked={setChecked}
					checked={checked}
					submitFindByNameFilm={props.submitFindByNameFilm}
					value={props.value}
					setValue={props.setValue}
					setShowError={props.setShowError}
        />
        {props.showError && props.movies.length === 0 ? (
					<h2 style={{ textAlign: 'center' }}>{props.showError}</h2>
				) : (
        <MoviesCardList
        findLike={props.findLike}
        movies={shortMovies}
        newItem={props.newItem}
        addedNewCard={props.addedNewCard}
        counterCard={props.counterCard}
        changeFilterValue={props.changeFilterValue}
        addedMovie={props.addedMovie}
        removeMovie={props.removeMovie}
        />
        )}
      </main>
      <Footer />
    </>
  );
}

export default Movies;

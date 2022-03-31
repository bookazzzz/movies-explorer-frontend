import React, { useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import useLocalStorage from '../../hooks/useLocalStorage';
import Preloader from '../Preloader/Preloader';

function Movies(props) {
	//состояние фильтрации короткометражки
	const [checked, setChecked] = useLocalStorage('checked', false);

	//локально фильтруем фильмы которые к нам идут из поискового стейта
	const [shortMovies, setShortMovies] = useLocalStorage('short_movies', []);

	//при определенном флаге управляем фильтрацией фильмов
	useEffect(() => {
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
				{props.isLoading ? (
					<Preloader />
				) : (
					<div>
						{props.showError && props.movies.length === 0 ? (
							<h1 style={{ textAlign: 'center' }}>{props.showError}</h1>
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
					</div>
				)}
			</main>
			<Footer />
		</>
	);
}

export default Movies;

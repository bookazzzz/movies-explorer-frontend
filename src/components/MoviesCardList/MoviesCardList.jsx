import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { Route, Switch } from 'react-router-dom';
import Preloader from "../Preloader/Preloader";

function MoviesCardList({ findLike, changeFilterValue, removeMoviesFunction, movies, newItem, addedNewCard, counterCard, addedMovie, removeMovie,isLoading}) {
	return (
		<section className='movies-card-list'>
			{isLoading && <Preloader />}

			<div className='movies-card-list__elements'>
			{movies?.slice(0, counterCard + newItem).map((movie, i) => {
					return (
						<MoviesCard 
						findLike={findLike}
						key={movie.movieId}
						{...movie}
						movie={movie}
						changeFilterValue={changeFilterValue}
						removeMoviesFunction={removeMoviesFunction}
						addedMovie={addedMovie}
						removeMovie={removeMovie} />
					);
				})}
			</div>
			
			<Switch>
				<Route path='/movies'>
					{movies?.length > counterCard + newItem && (
						<button onClick={() => addedNewCard()} className='movies-card-list__button' type='button'>
							{' '}
							Ещё{' '}
						</button>
					)}
				</Route>
				<Route path='/saved-movies'>
					{movies?.length > counterCard + newItem && (
						<button onClick={() => addedNewCard()} className='movies-card-list__button' type='button'>
							{' '}
							Ещё{' '}
						</button>
					)}
				</Route>
			</Switch>
		</section>
	);
}

export default MoviesCardList;
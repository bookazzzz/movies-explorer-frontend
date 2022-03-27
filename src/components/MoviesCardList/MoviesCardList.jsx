import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { Route, Switch } from 'react-router-dom';
import Preloader from "../Preloader/Preloader";

function MoviesCardList({ changeFilterValue, removeMoviesFunction, movies, newItem, addedNewCard, counterCard, isLoading}) {
	return (
		<section className='movies-card-list'>
			{isLoading && <Preloader />}

			<div className='movies-card-list__elements'>
				{movies?.slice(0, counterCard + newItem).map((movie, i) => {
					return (
						<MoviesCard key={movie.id} {...movie} movie={movie} changeFilterValue={changeFilterValue} removeMoviesFunction={removeMoviesFunction} />
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
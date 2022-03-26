import React from 'react';
import './MoviesCard.css';
import { Route, Switch } from 'react-router-dom';

function MoviesCard(props) {
	return (
		<article className='movies-card'>
			<div className='movies-card__container'>
				<div className='movie-card__info'>
					<h3 className='movies-card__name'>{props.nameRU}</h3>
					<p className='movies-card__description'>{props.duration}м</p>
				</div>
				<Switch>
					<Route path='/movies'>
						<button
							onClick={() => {
								props.changeFilterValue(props.movie.id, props.movie.filter);
							}}
							className={
								!props.movie.filter ? 'movies-card__save-button movies-card__save-button' : 'movies-card__save-button movies-card__save-button_active'
							}
							type='button'
						></button>
					</Route>
					<Route path='/saved-movies'>
						<button
							onClick={() => props.removeMoviesFunction(props.movie.id)}
							className='movies-card__save-button movies-card__delete-button'
							type='button'
						></button>
					</Route>
				</Switch>
			</div>
			<img className='movies-card__images' src={`https://api.nomoreparties.co/${props.image.url}`} alt='film' />
		</article>
	);
}

export default MoviesCard;

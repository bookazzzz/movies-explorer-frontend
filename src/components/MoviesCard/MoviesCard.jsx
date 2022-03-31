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
								!props.findLike(props.movie) ? props.addedMovie(props.movie) : props.removeMovie(props.movie);
							}}
							className={
								!props.findLike(props.movie)
									? 'movies-card__save-button movies-card__save-button'
									: 'movies-card__save-button movies-card__save-button_active'
							}
							type='button'
						></button>
					</Route>
					<Route path='/saved-movies'>
						<button
							onClick={() => props.removeMovie(props.movie)}
							className='movies-card__save-button movies-card__delete-button'
							type='button'
						></button>
					</Route>
				</Switch>
			</div>
			<a href={props.trailer} target="_blank" rel="noreferrer">
			<img className='movies-card__images' src={props.image} alt='film' />
			</a>
		</article>
	);
}

export default MoviesCard;

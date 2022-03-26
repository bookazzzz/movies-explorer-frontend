import './SavedMovies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies(props) {
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
				<div>
					<MoviesCardList
						movies={props.saveMovies}
						removeMoviesFunction={props.removeMoviesFunction}
						counterCard={props.counterCard}
						newItem={props.newItem}
						addedNewCard={props.addedNewCard}
					/>
				</div>
			</main>
			<Footer />
		</>
	);
}

export default SavedMovies;

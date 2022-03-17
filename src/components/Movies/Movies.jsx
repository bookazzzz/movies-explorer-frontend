import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies(props) {
    return (
        <>
            <Header loggedIn={props.loggedIn} />
            <main>
                <SearchForm/>
                <MoviesCardList/>  
            </main>
            <Footer />
        </>
    );
}

export default Movies;
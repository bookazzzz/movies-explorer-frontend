import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({
  showShortMovies,
  checked,
  findByNameFilm,
  setValue,
  value,
}) {
  return (
    <section className="search">
      <div className="search__container">
        <form className="search__form">
          <div className="search__container-input-box">
            <input
              className="search__input"
              name="keyword"
              type="text"
              placeholder="Фильм"
              minLength="1"
              maxLength="200"
              required
              value={value}
              onChange={(e) => setValue(e.currentTarget.value)}
            />
          </div>
          <button
            className="search__button"
            onClick={(e) => {
              e.preventDefault();
              findByNameFilm();
              setValue("");
            }}
          >
            Найти
          </button>
        </form>

        <FilterCheckbox showShortMovies={showShortMovies} checked={checked} />
      </div>
    </section>
  );
}

export default SearchForm;

import React from 'react'
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
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
            />
          </div>
          <button className="search__button">Найти</button>
        </form>

        <FilterCheckbox />
      </div>
    </section>
  );
}

export default SearchForm;

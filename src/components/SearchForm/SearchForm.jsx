import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({ setChecked, checked, submitFindByNameFilm, value, setValue, setShowError }) {
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
							onChange={(e) => {
								setValue(e.currentTarget.value);
								setShowError('');
							}}
            />
          </div>
          <button
            className="search__button"
            onClick={(e) => {
							e.preventDefault();
							submitFindByNameFilm(value);
						}}
          >
            Найти
          </button>
        </form>

        <FilterCheckbox setChecked={setChecked} checked={checked} />
      </div>
    </section>
  );
}

export default SearchForm;

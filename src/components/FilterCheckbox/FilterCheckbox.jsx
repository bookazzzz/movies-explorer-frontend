import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({ showShortMovies, checked }) {
  return (
    <div className="filter">
      <input
        type="checkbox"
        className="filter__checkbox"
        name="filter__film"
        checked={checked}
        onChange={() => {
          showShortMovies();
        }}
      />
      <label className="filter__label">Короткометражки</label>
    </div>
  );
}

export default FilterCheckbox;

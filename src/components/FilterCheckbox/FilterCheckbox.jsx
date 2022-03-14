import React from 'react'
import "./FilterCheckbox.css";

function FilterCheckbox() {
  return (
    <div className="filter">
      <input type="checkbox" className="filter__checkbox" name="filter__film" />
      <label className="filter__label">Короткометражки</label>
    </div>
  );
}

export default FilterCheckbox;

import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({ setChecked, checked }) {
  return (
    <div className="filter">
      <input
        type="checkbox"
        className="filter__checkbox"
        name="filter__film"
        checked={checked}
				onChange={() => {
					setChecked(!checked);
				}}
      />
      <label className="filter__label">Короткометражки</label>
    </div>
  );
}

export default FilterCheckbox;

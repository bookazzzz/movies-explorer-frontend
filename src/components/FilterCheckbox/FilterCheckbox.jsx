import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({ setChecked, checked }) {
	return (
		<div className='filter'>
			<input
				checked={checked}
				onChange={() => {
					setChecked(!checked);
				}}
				type='checkbox'
				className='filter__checkbox'
				name='filter__film'
			/>
			<label className='filter__label'>Короткометражки</label>
		</div>
	);
}

export default FilterCheckbox;

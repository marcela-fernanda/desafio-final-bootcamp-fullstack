import React from 'react';
import css from './css/filter.module.css';

export default function Filter({ onValueChange, filterValue, period }) {
  const handleValueChange = (event) => {
    onValueChange(event.target.value, period);
  };

  return (
    <div className={`input-field ${css.mainDiv}`}>
      <input
        placeholder="Filtro"
        type="text"
        value={filterValue}
        onChange={handleValueChange}
      />
    </div>
  );
}

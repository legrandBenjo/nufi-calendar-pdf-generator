import React from 'react';

const YearSelector = ({ years, selectedYear, onSelectYear }) => {
  return (
    <div className="year-selector">
      <label htmlFor="year-select">Sélectionnez une année : </label>
      <select
        id="year-select"
        value={selectedYear}
        onChange={(e) => onSelectYear(e.target.value)}
      >
        {years.map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default YearSelector;
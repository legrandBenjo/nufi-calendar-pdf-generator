import React, { useState, useEffect } from 'react';
import FileUploader from './components/FileUploader';
import YearSelector from './components/YearSelector';
import PDFGenerator from './components/PDF/PDFGenerator';
import './App.css';

function App() {
  const [calendarData, setCalendarData] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');

  // Extraire les années disponibles quand les données changent
  useEffect(() => {
    if (calendarData.length > 0) {
      const years = [...new Set(calendarData.map(item => item.year))].sort();
      setAvailableYears(years);
      setSelectedYear(years[0] || ''); // Sélectionne la première année par défaut
    }
  }, [calendarData]);

  // Filtrer les données par année sélectionnée
  const filteredData = selectedYear 
    ? calendarData.filter(item => item.year === selectedYear)
    : [];

  return (
    <div className="app-container">
      <h1>Générateur de Calendrier Nufi</h1>
      <FileUploader setCalendarData={setCalendarData} />
      
      {availableYears.length > 0 && (
        <YearSelector 
          years={availableYears} 
          selectedYear={selectedYear}
          onSelectYear={setSelectedYear}
        />
      )}

      {filteredData.length > 0 && (
        <>
          <PDFGenerator data={filteredData} year={selectedYear} />
        </>
      )}
    </div>
  );
}

export default App;
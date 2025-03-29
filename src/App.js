import React, { useState } from 'react';
import FileUploader from './components/FileUploader'; // Chemin corrigé
import CalendarView from './components/CalendarView'; // Chemin corrigé
import PDFGenerator from './components/PDF/PDFGenerator'; // Chemin corrigé
import './App.css';

function App() {
  const [calendarData, setCalendarData] = useState([]);

  return (
    <div className="app-container">
      <h1>Générateur de Calendrier Nufi</h1>
      <FileUploader setCalendarData={setCalendarData} />
      
      {calendarData.length > 0 && (
        <>
          <CalendarView data={calendarData} />
          <PDFGenerator data={calendarData} />
        </>
      )}
    </div>
  );
}

export default App;
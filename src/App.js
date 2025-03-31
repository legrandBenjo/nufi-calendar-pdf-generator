import React, { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import FileUploader from './components/FileUploader';
import NufiCalendarPDF from '../src/components/PDF/NufiCalendarPDF';
import YearSelector from './components/YearSelector';
import './App.css';

function App() {
  const [calendarData, setCalendarData] = useState([]);
  const [calendarType, setCalendarType] = useState('nufi');
  const [selectedYear, setSelectedYear] = useState('');

  const handleDataLoaded = (data) => {
    setCalendarData(data);
    if (data.length > 0) {
      const years = [...new Set(data.map(item => item.year))].sort();
      setSelectedYear(years[years.length - 1]);
    }
  };

  const filteredData = calendarData.filter(item => item.year === selectedYear);

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: '0 auto' }}>
      <h1>Générateur de Calendrier</h1>
      
      <div style={{ marginBottom: 20 }}>
        <label style={{ marginRight: 10 }}>Langue : </label>
        <select 
          value={calendarType}
          onChange={(e) => setCalendarType(e.target.value)}
          style={{ padding: 8 }}
        >
          <option value="nufi">Nufi</option>
          <option value="ghomala">Ghomala</option>
        </select>
      </div>

      <FileUploader 
        setCalendarData={handleDataLoaded}
        calendarType={calendarType}
      />

      {calendarData.length > 0 && (
        <>
          <YearSelector
            years={[...new Set(calendarData.map(item => item.year))].sort()}
            selectedYear={selectedYear}
            onSelectYear={setSelectedYear}
          />

          <div style={{ marginTop: 20 }}>
            <PDFDownloadLink
              document={<NufiCalendarPDF data={filteredData} />}
              fileName={`calendrier_${calendarType}_${selectedYear}.pdf`}
              style={{
                padding: '10px 15px',
                background: '#2196F3',
                color: 'white',
                textDecoration: 'none',
                borderRadius: 4,
                display: 'inline-block',
                marginTop: 10
              }}
            >
              {({ loading }) => loading ? 'Préparation...' : 'Télécharger PDF'}
            </PDFDownloadLink>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
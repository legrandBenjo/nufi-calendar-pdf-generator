import React, { useState, useEffect } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import CalendarPDF from '../src/components/PDF/CalendarPDF';
import YearSelector from './components/YearSelector';
import CSVUploader from './components/CSVUploader';
import { parseCSVData } from './utils/csvParser';
import './App.css';

// Chemins vers les fichiers CSV
const CSV_PATHS = {
  nufi: process.env.PUBLIC_URL + '/data/Nufi_calendar_calendrier_history_1900_2200.csv',
  ghomala: process.env.PUBLIC_URL + '/data/Ghomala_calendar_calendrier_history_1900_2200.csv'
};

function App() {
  const [calendarData, setCalendarData] = useState([]);
  const [calendarType, setCalendarType] = useState('nufi');
  const [selectedYear, setSelectedYear] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [useDefaultFile, setUseDefaultFile] = useState(true);
  const currentYear = new Date().getFullYear().toString();
  

  // Chargement automatique du CSV par défaut
  useEffect(() => {
    if (useDefaultFile) {
      loadDefaultCSV();
    }
  }, [calendarType, useDefaultFile]);

  const loadDefaultCSV = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(CSV_PATHS[calendarType]);
      const csvText = await response.text();
      processCSVData(csvText);
    } catch (error) {
      console.error("Erreur de chargement du CSV:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (csvText) => {
    setUseDefaultFile(false);
    processCSVData(csvText);
  };

  const processCSVData = (csvText) => {
    const parsedData = parseCSVData(csvText, calendarType);
    setCalendarData(parsedData);
    
    
    if (parsedData.length > 0) {
      const years = [...new Set(parsedData.map(item => item.year))].sort();

      // Sélectionne l'année courante si disponible, sinon la dernière année
      setSelectedYear(years.includes(currentYear) ? currentYear : years[years.length - 1]);
    }
  };

  const handleLanguageChange = (e) => {
    setCalendarType(e.target.value);
    setUseDefaultFile(true);
  };

  const filteredData = calendarData.filter(item => item.year === selectedYear);

  return (
    <div className="app-container">
      <h1 className="app-title">Générateur de Calendrier PDF</h1>
      
      <div className="control-group">
        <label className="control-label">Langue :</label>
        <select 
          value={calendarType}
          onChange={handleLanguageChange}
          className="language-select"
          disabled={isLoading}
        >
          <option value="nufi">Nufi</option>
          <option value="ghomala">Ghomala</option>
        </select>
      </div>

      <div className="control-group">
        <CSVUploader onFileLoaded={handleFileUpload} acceptedFormats=".csv,.xlsx,.xls" />
        <small className={`file-info ${useDefaultFile ? 'default-file' : 'custom-file'}`}>
          {useDefaultFile ? 
            `Utilisation du fichier ${calendarType} par défaut` : 
            'Utilisation du fichier personnalisé'}
        </small>
      </div>

      {isLoading ? (
        <p>Chargement en cours...</p>
      ) : calendarData.length > 0 ? (
        <>
          <YearSelector
            years={[...new Set(calendarData.map(item => item.year))].sort()}
            selectedYear={selectedYear}
            onSelectYear={setSelectedYear}
          />

          <div style={{ marginTop: 20 }}>
            <PDFDownloadLink
              document={<CalendarPDF data={filteredData} />}
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
      ) : (
        <p>Aucune donnée disponible. Veuillez charger un fichier CSV.</p>
      )}
      <div className="blocktext">© Resulam {currentYear}</div>
    </div>
  );
}

export default App;
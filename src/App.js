import React, { useState, useEffect, useCallback } from 'react';
import './utils/fontSetup';
import { PDFDownloadLink } from '@react-pdf/renderer';
import CalendarPDF from '../src/components/PDF/CalendarPDF';
import YearSelector from './components/YearSelector';
import { parseCSVData } from './utils/csvParser';
import { isCurrentDayScreen } from './utils/dateUtils'; 
import './App.css';

// Constantes pour les types de calendrier
const CALENDAR_TYPES = {
  NUFI: 'nufi',
  GHOMALA: 'ghomala'
};

// Chemins vers les fichiers CSV
const CSV_PATHS = {
  [CALENDAR_TYPES.NUFI]: process.env.PUBLIC_URL + '/data/Nufi_calendar_calendrier_history_1900_2200.csv',
  [CALENDAR_TYPES.GHOMALA]: process.env.PUBLIC_URL + '/data/Ghomala_calendar_calendrier_history_1900_2200.csv'
};

function App() {
  const [calendarData, setCalendarData] = useState([]);
  const [calendarType, setCalendarType] = useState(CALENDAR_TYPES.NUFI);
  const [selectedYear, setSelectedYear] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [useDefaultFile, setUseDefaultFile] = useState(true);
  const [error, setError] = useState(null);
  const [todayDate, setTodayDate] = useState(null);
  const currentYear = new Date().getFullYear().toString();

  // Traitement des données CSV
    const processCSVData = useCallback((csvText, type) => {
    try {
      const parsedData = parseCSVData(csvText, type);
      setCalendarData(parsedData);
      setError(null);

      if (parsedData.length > 0) {
        const years = [...new Set(parsedData.map(item => item.year))].sort();
        const defaultYear = years.includes(currentYear) ? currentYear : years[years.length - 1];
        setSelectedYear(defaultYear);

        // Recherche de la date actuelle
        const todayItem = parsedData.find(item => isCurrentDayScreen(item));

        if (todayItem) {
         // Utilisez fullDateLocal qui contient le format complet
        setTodayDate(todayItem.fullDateLocal || `${todayItem.dayLocal} ${todayItem.date}, ${todayItem.year}`);
        }
      }
    } catch (err) {
      console.error("Erreur de traitement du CSV:", err);
      setError("Erreur lors du traitement du fichier CSV.");
      setCalendarData([]);
    }
  }, [currentYear]);

  // Chargement du CSV par défaut
  const loadDefaultCSV = useCallback(async () => {
    if (!useDefaultFile) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(CSV_PATHS[calendarType]);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const csvText = await response.text();
      processCSVData(csvText, calendarType);
    } catch (err) {
      console.error("Erreur de chargement du CSV:", err);
      setError(`Erreur de chargement du fichier ${calendarType} par défaut`);
    } finally {
      setIsLoading(false);
    }
  }, [calendarType, useDefaultFile, processCSVData]);

  // Gestion du changement de langue
  const handleLanguageChange = (e) => {
    setCalendarType(e.target.value);
    setUseDefaultFile(true);
  };

  // Filtrage des données par année sélectionnée
  const filteredData = calendarData.filter(item => item.year === selectedYear);

  // Effet pour charger les données
  useEffect(() => {
      loadDefaultCSV();
  }, [calendarType, useDefaultFile, loadDefaultCSV]);

  return (
    <div className="app-container">
      <h1 className="app-title">Générateur de Calendrier en PDF</h1>
      
      {/* Sélecteur de langue */}
      <div className="control-group">
        <label className="control-label">Sélectionner la langue dans la liste ci-dessous:</label>
        <select 
          value={calendarType}
          onChange={handleLanguageChange}
          className="language-select"
          disabled={isLoading}
        >
          <option value={CALENDAR_TYPES.NUFI}>Nufi</option>
          <option value={CALENDAR_TYPES.GHOMALA}>Ghomala</option>
        </select>
      </div>

      {/* Affichage de la date du jour */}
      {todayDate ? (
      <div className="today-date">
        <div className="gregorian-date">
          {new Date().toLocaleDateString('fr-FR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
        <div className="native-date">
          {todayDate}
        </div>
      </div>
      ) : (
      <div className="today-not-found">
        {calendarData.length > 0 ? (
          <>
            Données disponibles du {calendarData[0].date} au {calendarData[calendarData.length - 1].date}.<br />
            La date du jour n'est pas incluse.
          </>
        ) : null}
      </div>
      )}

      {/* Affichage des erreurs */}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* Contenu principal */}
      {isLoading ? (
        <div className="loading-indicator">Chargement en cours...</div>
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
              {({ loading }) => loading ? 'Préparation...' : 'Télécharger le calendrier en PDF'}
            </PDFDownloadLink>
          </div>
        </>
      ) : (
        !error && <p className="no-data-message">Aucune donnée disponible. Veuillez charger un fichier CSV.</p>
      )}

      <div className="copyright">© Resulam {currentYear}</div>
    </div>
  );
}

export default App;
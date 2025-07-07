import React, { useState, useEffect, useCallback, useMemo } from 'react';
//import CalendarPDF from './components/PDF/CalendarPDF';
import YearSelector from './components/YearSelector';
import { parseCSVData } from './utils/csvParser';
import registerFonts from './utils/fontSetup';
import DateSelector from './components/DateSelector';
import PDFDownloader from './components/PDFDownloader';
import { registerLocale } from "react-datepicker";
import fr from 'date-fns/locale/fr';
import './App.css';

registerLocale('fr', fr);

const CALENDAR_TYPES = {
  NUFI: 'nufi',
  GHOMALA: 'ghomala'
};

const CSV_PATHS = {
  [CALENDAR_TYPES.NUFI]: process.env.PUBLIC_URL + '/data/Nufi_calendar_calendrier_history_1900_2200.csv',
  [CALENDAR_TYPES.GHOMALA]: process.env.PUBLIC_URL + '/data/Ghomala_calendar_calendrier_history_1900_2200.csv'
};

// Composants mémoïsés
const MemoizedDateSelector = React.memo(DateSelector);
const MemoizedYearSelector = React.memo(YearSelector);

function App() {
  const [calendarData, setCalendarData] = useState([]);
  const [dataCache, setDataCache] = useState({});
  const [calendarType, setCalendarType] = useState(CALENDAR_TYPES.NUFI);
  const [selectedYear, setSelectedYear] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentDisplayDate, setCurrentDisplayDate] = useState(new Date());
  const currentYear = new Date().getFullYear().toString();

  useEffect(() => {
    registerFonts();
  }, []);

  const processCSVData = useCallback((csvText, type) => {
    try {
      const cacheKey = `${type}_${csvText.length}`;
      if (dataCache[cacheKey]) {
        return dataCache[cacheKey];
      }
      
      const parsedData = parseCSVData(csvText, type);
      setDataCache(prev => ({...prev, [cacheKey]: parsedData}));
      return parsedData;
    } catch (err) {
      console.error("Erreur de traitement du CSV:", err);
      throw err;
    }
  }, [dataCache]);

  const loadDefaultCSV = useCallback(async (signal) => {
  setIsLoading(true);
  setError(null);

  try {
    const response = await fetch(CSV_PATHS[calendarType], { signal });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const csvText = await response.text();
    const parsedData = processCSVData(csvText, calendarType);
    setCalendarData(parsedData);

    if (parsedData.length > 0) {
      const years = [...new Set(parsedData.map(item => item.year))].sort();
      const defaultYear = years.includes(currentYear) ? currentYear : years[years.length - 1];
      setSelectedYear(defaultYear);
    }
  } catch (err) {
    if (err.name !== 'AbortError') {
      console.error("Erreur de chargement du CSV:", err);
      setError(`Erreur de chargement du fichier ${calendarType} par défaut`);
    }
  } finally {
    setIsLoading(false);
  }
}, [calendarType, processCSVData, currentYear]);


  const handleLanguageChange = (e) => {
    setCalendarType(e.target.value);
  };

  useEffect(() => {
  const controller = new AbortController();

  loadDefaultCSV(controller.signal);

  return () => controller.abort(); // cleanup
}, [calendarType, loadDefaultCSV]);


  // Données filtrées mémoïsées
  const filteredData = useMemo(() => (
    calendarData.filter(item => item.year === selectedYear)
  ), [calendarData, selectedYear]);

  // Limites de dates mémoïsées
  const { minDate, maxDate } = useMemo(() => {
    if (calendarData.length === 0) return { minDate: null, maxDate: null };
    
    const firstItem = calendarData[0];
    const lastItem = calendarData[calendarData.length - 1];
    
    const minDate = new Date(firstItem.date.split(' ')[2], 0, 1);
    const maxDate = new Date(lastItem.date.split(' ')[2], 11, 31);
    
    return { minDate, maxDate };
  }, [calendarData]);

  return (
    <div className="app-container">
      <h1 className="app-title">Générateur de Calendrier en PDF</h1>
      
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

      {calendarData.length > 0 && (
        <MemoizedDateSelector
          selectedDate={currentDisplayDate}
          onChange={setCurrentDisplayDate}
          minDate={minDate}
          maxDate={maxDate}
          calendarType={calendarType}
          calendarData={calendarData}
        />
      )}

      {error && <div className="error-message">{error}</div>}

      {isLoading ? (
        <div className="loading-indicator">Chargement en cours...</div>
      ) : calendarData.length > 0 ? (
        <>
          <MemoizedYearSelector
            years={[...new Set(calendarData.map(item => item.year))].sort()}
            selectedYear={selectedYear}
            onSelectYear={setSelectedYear}
          />

          <div style={{ marginTop: 20 }}>
          <PDFDownloader
            data={filteredData}
            calendarType={calendarType}
            selectedYear={selectedYear}
          />

        </div>
        </>
      ) : (
        !error && <p className="no-data-message">Aucune donnée disponible.</p>
      )}

      <div className="copyright">© Resulam {new Date().getFullYear()}</div>
    </div>
  );
}

export default App;
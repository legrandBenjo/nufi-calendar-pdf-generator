import React, { useState, useEffect, useMemo, useCallback } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';
import '../DateSelector.css';

registerLocale('fr', fr);

const isToday = (date) => {
  if (!date || isNaN(date.getTime())) return false;
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const DateSelector = ({ selectedDate, onChange, minDate, maxDate, calendarType, calendarData }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [localDate, setLocalDate] = useState(null);

  // Utilisation de useCallback pour mémoïser la fonction
  const findLocalDate = useCallback((date) => {
    if (!date || !calendarData?.length) return null;
    
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();
    const searchStr = `${month} ${day} ${year}`;
    
    const foundItem = calendarData.find(item => item.date === searchStr);
    return foundItem?.fullDateLocal || null;
  }, [calendarData]); // Dépendance nécessaire

  // Gère le responsive
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Met à jour la date locale
  useEffect(() => {
    if (selectedDate) {
      const newLocalDate = findLocalDate(selectedDate);
      setLocalDate(newLocalDate);
    }
  }, [selectedDate, findLocalDate]); // Maintenant findLocalDate est stable grâce à useCallback

  const dateFormat = useMemo(() => 
    isMobile ? "dd/MM/yyyy" : "dd MMMM yyyy",
    [isMobile]
  );

  if (!selectedDate || isNaN(selectedDate.getTime())) {
    return <div className="date-selector-container">Date invalide</div>;
  }

  return (
    <div className="date-selector-container">
      {isToday(selectedDate) && (
        <div className="today-badge">Aujourd'hui</div>
      )}
      
      <div className="date-display-wrapper">
        <DatePicker
          selected={selectedDate}
          onChange={onChange}
          minDate={minDate}
          maxDate={maxDate}
          dateFormat={dateFormat}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          locale="fr"
          className="custom-datepicker"
          calendarClassName="custom-calendar"
          popperPlacement={isMobile ? "auto" : "bottom"}
          useWeekdaysShort={true}
          shouldCloseOnSelect={true}
          withPortal={isMobile}
        />
        
        {localDate ? (
          <div className={`native-date ${calendarType}`}>
            {localDate}
          </div>
        ) : (
          <div className="date-not-found">
            Date non trouvée dans les données
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(DateSelector);
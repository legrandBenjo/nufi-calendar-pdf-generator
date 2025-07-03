import React from 'react';
import '../DateNavigator.css';

const DateNavigator = ({ 
  calendarData, 
  calendarType, 
  currentDisplayDate, 
  onDateChange 
}) => {
  // Fonction optimisée pour trouver la date
  const findDateData = () => {
    const targetDate = new Date(currentDisplayDate);
    const targetYear = targetDate.getFullYear();
    const targetMonth = targetDate.toLocaleString('en-US', { month: 'long' });
    const targetDay = targetDate.getDate();

    return calendarData.find(item => {
      const [month, day, year] = item.date.split(' ');
      return (
        month === targetMonth &&
        parseInt(day) === targetDay &&
        parseInt(year) === targetYear
      );
    });
  };

  const dateData = findDateData();
  
  // Calcul des limites de dates
  const getBoundaries = () => {
    if (calendarData.length === 0) return { min: null, max: null };
    
    const dates = calendarData.map(item => {
      const [month, day, year] = item.date.split(' ');
      return new Date(`${month} ${day}, ${year}`);
    });
    
    return {
      min: new Date(Math.min(...dates)),
      max: new Date(Math.max(...dates))
    };
  };

  const { min, max } = getBoundaries();
  const canGoPrev = min && currentDisplayDate > min;
  const canGoNext = max && currentDisplayDate < max;

  return (
    <div className="date-navigation-container">
      <button 
        onClick={() => onDateChange(-1)}
        className={`nav-button ${!canGoPrev ? 'disabled' : ''}`}
        disabled={!canGoPrev}
      >
        ←
      </button>
      
      <div className="date-display">
        <div className="gregorian-date">
          {currentDisplayDate.toLocaleDateString('fr-FR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
        <div className="native-date">
          {dateData?.fullDateLocal || `Date non trouvée (${min?.toLocaleDateString()} - ${max?.toLocaleDateString()})`}
        </div>
      </div>
      
      <button 
        onClick={() => onDateChange(1)}
        className={`nav-button ${!canGoNext ? 'disabled' : ''}`}
        disabled={!canGoNext}
      >
        →
      </button>
    </div>
  );
};

export default DateNavigator;
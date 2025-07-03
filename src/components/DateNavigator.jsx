import React from 'react';
import '../DateNavigator.css';

const DateNavigator = ({ 
  calendarData, 
  calendarType, 
  currentDisplayDate, 
  onDateChange 
}) => {
  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isPastDate = (date) => {
    const today = new Date();
    return date < today && !isToday(date);
  };

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
  const dateStatus = isToday(currentDisplayDate) 
    ? 'today' 
    : isPastDate(currentDisplayDate) 
      ? 'past' 
      : 'future';

  return (
    <div className={`date-navigation-container ${dateStatus}`}>
      <button 
        onClick={() => onDateChange(-1)}
        className="nav-button"
      >
        ←
      </button>
      
      <div className="date-display">
        <div className="gregorian">
          {currentDisplayDate.toLocaleDateString('fr-FR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
        <div className="native">
          {dateData?.fullDateLocal || 'Date non disponible'}
        </div>
        {isToday(currentDisplayDate) && (
          <div className="date-badge">Aujourd'hui</div>
        )}
      </div>
      
      <button 
        onClick={() => onDateChange(1)}
        className="nav-button"
      >
        →
      </button>
    </div>
  );
};

export default DateNavigator;
import { MONTHS_MAPPING } from '../constants/monthsMapping';
export const getFirstDayOffset = (monthData) => {
    const firstDay = monthData[0]?.dayEng || '';
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days.indexOf(firstDay);
  };
  
  export const isCurrentDay = (dayData, currentYear) => {
    const [month, day] = dayData.date.split(' ');
    const monthIndex = Object.keys(MONTHS_MAPPING.nufi).indexOf(month);
    const today = new Date();
    
    return (
      today.getDate() === parseInt(day) &&
      today.getMonth() === monthIndex &&
      today.getFullYear() === parseInt(currentYear)
    );
  };
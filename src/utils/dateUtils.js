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

  export function isCurrentDayScreen(csvRow) {
    if (!csvRow || !csvRow.date) {
      console.warn("Ligne ou dateEng manquante", csvRow);
      return false;
    }
    try {
      // Format: "Month Day Year" (ex: "July 2 2025")
      const dateParts = csvRow.date.split(' ');
      if (dateParts.length !== 3) return false;
      
      const [month, day, year] = dateParts;
      const csvDate = new Date(`${month} ${day.replace(',', '')}, ${year}`);
      const today = new Date();
      
      return (
        csvDate.getFullYear() === today.getFullYear() &&
        csvDate.getMonth() === today.getMonth() &&
        csvDate.getDate() === today.getDate()
      );
    } catch (e) {
      console.error("Erreur de comparaison de date:", e, "pour la ligne:", csvRow);
      return false;
    }
}
import { Page, Text, View } from '@react-pdf/renderer';
import MonthGrid from './MonthGrid';
import { styles } from '../constants/styles';

const CalendarPage = ({ data }) => {
  const currentYear = data[0]?.year || '';
  const calendarType = data[0]?.calendarType || 'nufi';
  
  // Organiser les données par mois
  const monthsData = data.reduce((acc, item) => {
    const month = item.date.split(' ')[0];
    if (!acc[month]) acc[month] = [];
    acc[month].push(item);
    return acc;
  }, {});

  return (
    <>
      <Page size="A4" style={styles.page}>
        <Text style={styles.yearTitle}>
          Calendrier {calendarType.toUpperCase()} {currentYear}
        </Text>
      </Page>

      {Object.entries(monthsData).map(([month, monthData]) => (
        <Page key={month} size="A4" style={styles.page}>
          <MonthGrid 
            month={month} 
            monthData={monthData} 
            currentYear={currentYear}
            calendarType={calendarType}
          />
        </Page>
      ))}
    </>
  );
};

export default CalendarPage;
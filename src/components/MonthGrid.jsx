import { View, Text } from '@react-pdf/renderer';
import DayCell from './DayCell';
import { getMonthLabel } from '../utils/getMonthLabel';
import { getFirstDayOffset } from '../utils/dateUtils';
import { styles } from '../constants/styles';

const MonthGrid = ({ month, monthData, currentYear, calendarType }) => {
  const firstDayOffset = getFirstDayOffset(monthData);
  
  return (
    <View style={styles.monthContainer}>
      <Text style={styles.monthHeader}>
        {getMonthLabel(month, calendarType)}
      </Text>
      <Text style={styles.monthSubtitle}>
        {currentYear}
      </Text>
      
      <View style={styles.grid}>
        {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((day, i) => (
          <Text key={i} style={styles.dayHeader}>{day}</Text>
        ))}
      </View>
      
      <View style={styles.grid}>
        {Array.from({ length: firstDayOffset }).map((_, i) => (
          <View key={`empty-${i}`} style={styles.emptyCell} />
        ))}
        
        {monthData.map((day, i) => (
          <DayCell 
            key={i} 
            day={day} 
            currentYear={currentYear} 
          />
        ))}
      </View>
    </View>
  );
};

export default MonthGrid;
import { View, Text } from '@react-pdf/renderer';
import { isCurrentDay } from '../utils/dateUtils';
import { styles } from '../constants/styles';

const DayCell = ({ day, currentYear }) => {
  const isWeekend = ['Saturday', 'Sunday'].includes(day.dayEng);
  const isToday = isCurrentDay(day, currentYear);
  
  return (
    <View 
      style={[
        styles.dayCell,
        isWeekend && styles.weekendDay,
        isToday && styles.currentDay
      ]}
    >
      <View style={styles.dayContent}>
        <Text style={styles.dayNumber}>
          {day.date.split(' ')[1]}
        </Text>
        <Text style={styles.dayName}>
          {day.dayLocal}
        </Text>
      </View>
    </View>
  );
};

export default DayCell;
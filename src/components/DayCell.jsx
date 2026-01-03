import { View, Text } from '@react-pdf/renderer';
import { isCurrentDay } from '../utils/dateUtils';
import { styles } from '../constants/styles';

const DayCell = ({ day, currentYear, isA3 }) => {
  const isWeekend = ['Saturday', 'Sunday'].includes(day.dayEng);
  const isToday = isCurrentDay(day, currentYear);

  return (
    <View
      style={[
        isA3 ? styles.dayCellA3 : styles.dayCell,
        isWeekend && styles.weekendDay,
        isToday && styles.currentDay
      ]}
    >
      <View style={styles.dayContent}>
        <Text style={isA3 ? styles.dayNumberA3 : styles.dayNumber}>
          {day.date.split(' ')[1]}
        </Text>
        <Text style={isA3 ? styles.dayNameA3 : styles.dayName}>
          {day.dayLocal}
        </Text>
      </View>
    </View>
  );
};

export default DayCell;
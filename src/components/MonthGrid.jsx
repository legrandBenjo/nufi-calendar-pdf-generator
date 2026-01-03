import { View, Text } from '@react-pdf/renderer';
import DayCell from './DayCell';
import { getMonthLabel } from '../utils/getMonthLabel';
import { getFirstDayOffset } from '../utils/dateUtils';
import { styles } from '../constants/styles';

const MonthGrid = ({ month, monthData, currentYear, calendarType, isA3 }) => {
  const firstDayOffset = getFirstDayOffset(monthData);

  return (
    <View style={isA3 ? styles.monthContainerA3 : styles.monthContainer}>
      <Text style={isA3 ? styles.monthHeaderA3 : styles.monthHeader}>
        {getMonthLabel(month, calendarType)}
      </Text>
      <Text style={isA3 ? styles.monthSubtitleA3 : styles.monthSubtitle}>
        {currentYear}
      </Text>

      <View style={styles.grid}>
        {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((day, i) => (
          <Text key={i} style={isA3 ? styles.dayHeaderA3 : styles.dayHeader}>{day}</Text>
        ))}
      </View>

      <View style={styles.grid}>
        {Array.from({ length: firstDayOffset }).map((_, i) => (
          <View key={`empty-${i}`} style={isA3 ? styles.emptyCellA3 : styles.emptyCell} />
        ))}

        {monthData.map((day, i) => (
          <DayCell
            key={i}
            day={day}
            currentYear={currentYear}
            isA3={isA3}
          />
        ))}
      </View>
    </View>
  );
};

export default MonthGrid;
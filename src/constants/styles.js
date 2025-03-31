import { StyleSheet } from '@react-pdf/renderer';
import { COLORS } from './colors';

export const styles = StyleSheet.create({
  document: {
    fontFamily: 'NotoSans',
  },
  page: {
    padding: 40,
    backgroundColor: '#ffffff'
  },
  yearTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: COLORS.primary,
    textTransform: 'uppercase',
    letterSpacing: 1.5
  },
  monthContainer: {
    marginBottom: 25,
    border: `1pt solid ${COLORS.light}`,
    borderRadius: 8,
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  monthHeader: {
    backgroundColor: COLORS.primary,
    color: 'white',
    padding: 12,
    textAlign: 'center',
    marginBottom: 0,
    fontWeight: 'bold',
    fontSize: 16
  },
  grid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white'
  },
  dayHeader: {
    width: '14.28%',
    padding: 8,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: COLORS.secondary,
    color: 'white',
    fontSize: 10,
    borderRight: `1pt solid ${COLORS.light}`,
    borderBottom: `1pt solid ${COLORS.light}`,
    ':last-child': {
      borderRight: 'none'
    }
  },
  dayCell: {
    width: '14.28%',
    height: 40,
    padding: 5,
    borderRight: `1pt solid ${COLORS.light}`,
    borderBottom: `1pt solid ${COLORS.light}`,
    ':nth-child(7n)': {
      borderRight: 'none'
    }
  },
  dayContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  dayNumber: {
    fontWeight: 'bold',
    marginBottom: 2,
    color: COLORS.dark,
    fontSize: 12
  },
  dayName: {
    fontSize: 9,
    color: COLORS.text,
    //textTransform: 'uppercase',
    includeFontPadding: false,
    textAlign: 'center'
  },
  weekendDay: {
    backgroundColor: '#c8e4ea'
  },
  currentDay: {
    backgroundColor: '#fff8e1',
    border: `1pt solid ${COLORS.accent}`
  },
  emptyCell: {
    width: '14.28%',
    height: 40,
    backgroundColor: '#fdfdfd'
  },
  monthSubtitle: {
    textAlign: 'center',
    color: COLORS.text,
    fontSize: 10,
    marginTop: 3
  },
  weekRow: {
    flexDirection: 'row',
    width: '100%'
  }
});
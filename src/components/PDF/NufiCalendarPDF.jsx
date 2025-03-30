import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Enregistrement des polices
Font.register({
  family: 'NotoSans',
  fonts: [
    { 
      src: `${process.env.PUBLIC_URL}/fonts/NotoSans-Regular.ttf`,
      fontWeight: 400
    },
    { 
      src: `${process.env.PUBLIC_URL}/fonts/NotoSans-Bold.ttf`, 
      fontWeight: 700 
    },
  ],
  fallbackFamily: 'sans-serif'
});

// Correspondances des mois
const MONTHS_MAPPING = {
  nufi: {
    'January': 'Ngù\'fī',
    'February': 'Nkùɑ̀nʉ̀ɑ̀',
    'March': 'Mbàkngòfāt',
    'April': 'Sò\'njɑ̀ɑ̀',
    'May': 'Njwēnɑ̌hntà\'',
    'June': 'Mòmòshʉ̄',
    'July': 'Ntūmbhìngòfāt',
    'August': 'Mɑ̄ngà\'nshì',
    'September': 'Kùkū\'',
    'October': 'Ndǔ\'nzɑ̄',
    'November': 'Nkhʉ̀ɑ̀nʉ̀ɑ̀',
    'December': 'Ncátmɑ̄ŋū'
  },
  ghomala: {
    'January': 'Ŋkə̂mmghě',
    'February': 'Sɔ̂gwǐŋ',
    'March': 'Dzə̂tsə́',
    'April': 'Dzə̂biyɛ́',
    'May': 'Sûnè\'',
    'June': 'Dzʉ̂ʼbvʉ̀',
    'July': 'Fə̀fə̀',
    'August': 'Shwâgə̀fə̀',
    'September': 'Ŋkə̂mbiyɛ́',
    'October': 'Dzʉ̂ʼmkǒ',
    'November': 'Fə̂nàm',
    'December': 'Fʉ̂ʼbvʉ̀'
  }
};

// Couleurs du thème
const COLORS = {
  primary: '#4a6fa5',
  secondary: '#6b8cae',
  accent: '#ff7e5f',
  light: '#f8f9fa',
  dark: '#343a40',
  text: '#495057'
};

// Styles
const styles = StyleSheet.create({
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

const NufiCalendarPDF = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text>Aucune donnée à afficher</Text>
        </Page>
      </Document>
    );
  }

  // Utiliser l'année du premier élément
  const currentYear = data[0]?.year || '';
  const calendarType = data[0]?.calendarType || 'nufi';
  const monthsMapping = MONTHS_MAPPING[calendarType] || {};
  const today = new Date();

  // Organiser les données par mois
  const monthsData = data.reduce((acc, item) => {
    const month = item.date.split(' ')[0];
    if (!acc[month]) acc[month] = [];
    acc[month].push(item);
    return acc;
  }, {});

  // Trouver le premier jour du mois pour l'alignement
  const getFirstDayOffset = (monthData) => {
    const firstDay = monthData[0]?.dayEng || '';
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days.indexOf(firstDay);
  };

  const isCurrentDay = (dayData) => {
    const [month, day] = dayData.date.split(' ');
    const monthIndex = Object.keys(MONTHS_MAPPING.nufi).indexOf(month);
    return (
      today.getDate() === parseInt(day) &&
      today.getMonth() === monthIndex &&
      today.getFullYear() === parseInt(currentYear)
    );
  };

  const renderDays = (monthData, firstDayOffset) => {
    const weeks = [];
    let currentWeek = [];
    
    // Ajouter les cellules vides du début
    for (let i = 0; i < firstDayOffset; i++) {
      currentWeek.push(<View key={`empty-${i}`} style={styles.emptyCell} />);
    }

    // Ajouter les jours du mois
    monthData.forEach((day, index) => {
      const isWeekend = ['Saturday', 'Sunday'].includes(day.dayEng);
      const isToday = isCurrentDay(day);
      
      currentWeek.push(
        <View 
          key={index} 
          style={[
            styles.dayCell,
            isWeekend && styles.weekendDay,
            isToday && styles.currentDay
          ]}
        >
          <View style={styles.dayContent}>
            <Text style={styles.dayNumber}>{day.date.split(' ')[1]}</Text>
            <Text style={styles.dayName}>{day.dayLocal}</Text>
          </View>
        </View>
      );

      // Nouvelle ligne après 7 jours
      if (currentWeek.length === 7) {
        weeks.push(
          <View key={`week-${weeks.length}`} style={styles.weekRow}>
            {currentWeek}
          </View>
        );
        currentWeek = [];
      }
    });

    // Ajouter les jours restants de la dernière semaine
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(
          <View key={`empty-end-${currentWeek.length}`} style={styles.emptyCell} />
        );
      }
      weeks.push(
        <View key={`week-${weeks.length}`} style={styles.weekRow}>
          {currentWeek}
        </View>
      );
    }

    return weeks;
  };

  return (
    <Document style={styles.document}>
      <Page size="A4" style={styles.page}>
        <Text style={styles.yearTitle}>
          Calendrier {calendarType.toUpperCase()} {currentYear}
        </Text>
      </Page>

      {Object.entries(monthsData).map(([month, monthData]) => {
        const firstDayOffset = getFirstDayOffset(monthData);
        
        return (
          <Page key={month} size="A4" style={styles.page}>
            <View style={styles.monthContainer}>
              <Text style={styles.monthHeader}>
                {monthsMapping[month] || month}
              </Text>
              <Text style={styles.monthSubtitle}>
                {currentYear}
              </Text>
              
              {/* En-têtes des jours */}
              <View style={styles.grid}>
                {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((day, i) => (
                  <Text key={i} style={styles.dayHeader}>{day}</Text>
                ))}
              </View>
              
              {/* Jours du mois */}
              {renderDays(monthData, firstDayOffset)}
            </View>
          </Page>
        );
      })}
    </Document>
  );
};

export default NufiCalendarPDF;
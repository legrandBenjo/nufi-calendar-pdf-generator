import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Enregistrement des polices (fait une seule fois au chargement)
Font.register({
  family: 'NotoSans',
  fonts: [
    {
      src: `${process.env.PUBLIC_URL}/fonts/NotoSans-Regular.ttf`,
    },
    {
      src: `${process.env.PUBLIC_URL}/fonts/NotoSans-Bold.ttf`,
      fontWeight: 'bold',
    },
  ],
});

// Correspondance des mois
const MONTHS = {
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
};

// Création des styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'NotoSans',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  table: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#d3d3d3',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
  },
  tableHeader: {
    backgroundColor: '#404040',
    color: 'white',
    fontWeight: 'bold',
  },
  tableCell: {
    padding: 8,
    fontSize: 10,
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#d3d3d3',
  },
  nufiText: {
    fontFamily: 'NotoSans',
    color: '#2c3e50',
  },
  monthContainer: {
    marginBottom: 30,
    pageBreakAfter: 'auto'
  },
  monthTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 5
  },
});

const groupByMonth = (data) => {
  return data.reduce((acc, item) => {
    const month = item.date.split(' ')[0]; // Extrait le mois (ex: "January")
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(item);
    return acc;
  }, {});
};


const NufiCalendarPDF = ({ data }) => {
  const dataByMonth = groupByMonth(data);

  return (
    <Document>
      {Object.entries(dataByMonth).map(([month, monthData]) => (
        <Page key={month} size="A4" style={styles.page} wrap={false} >
          <View style={styles.monthContainer}>
            <Text style={styles.monthTitle}>
              {MONTHS[month]} / {month} 2026
            </Text>
            
            <View style={styles.table}>
              {/* En-têtes */}
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={styles.tableCell}>Date</Text>
                <Text style={styles.tableCell}>Jour (Anglais)</Text>
                <Text style={styles.tableCell}>Jour (Nufi)</Text>
                <Text style={styles.tableCell}>Date complète (Nufi)</Text>
              </View>
              
              {/* Données du mois */}
              {monthData.map((item, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{item.date}</Text>
                  <Text style={styles.tableCell}>{item.dayEng}</Text>
                  <Text style={styles.tableCell}>{item.dayNufi}</Text>
                  <Text style={styles.tableCell}>{item.fullDateNufi}</Text>
                </View>
              ))}
            </View>
          </View>
        </Page>
      ))}
    </Document>
  );
};

export default NufiCalendarPDF;
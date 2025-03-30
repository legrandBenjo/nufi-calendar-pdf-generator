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

// Correspondance des mois pour Nufi
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
  yearTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2c3e50'
  },
  monthPage: {
    padding: 40,
    fontFamily: 'NotoSans',
  },
  monthTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 5,
    textAlign: 'center'
  },
  table: {
    width: '100%',
    marginTop: 10,
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
});

const NufiCalendarPDF = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <Document>
        <Page size="A4">
          <Text>Aucune donnée à afficher</Text>
        </Page>
      </Document>
    );
  }

  const currentYear = data[0]?.year || '';
  const monthsData = data.reduce((acc, item) => {
    const month = item.date.split(' ')[0];
    if (!acc[month]) acc[month] = [];
    acc[month].push(item);
    return acc;
  }, {});

  return (
    <Document>
      {/* Page de titre */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.yearTitle}>
          Calendrier Nufi {currentYear}
        </Text>
      </Page>

      {/* Pages des mois */}
      {Object.entries(monthsData).map(([month, monthData]) => (
        <Page 
          key={month} 
          size="A4" 
          style={styles.monthPage}
          wrap={false} // Empêche le découpage sur plusieurs pages
        >
          <View>
            <Text style={styles.monthTitle}>
              {MONTHS[month] || month} {currentYear}
            </Text>
            
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={styles.tableCell}>Date</Text>
                <Text style={styles.tableCell}>Jour (Anglais)</Text>
                <Text style={styles.tableCell}>Jour (Nufi)</Text>
                <Text style={[styles.tableCell, { flex: 2 }]}>Date complète (Nufi)</Text>
              </View>
              
              {monthData.map((item, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{item.date}</Text>
                  <Text style={styles.tableCell}>{item.dayEng}</Text>
                  <Text style={styles.tableCell}>{item.dayNufi}</Text>
                  <Text style={[styles.tableCell, { flex: 2 }]}>{item.fullDateNufi}</Text>
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

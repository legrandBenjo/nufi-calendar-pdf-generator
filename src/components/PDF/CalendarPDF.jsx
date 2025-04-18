import { Document, Page, Text } from '@react-pdf/renderer';
import { Font } from '../../utils/fontSetup';
import CalendarPage from '../CalendarPage';
import { styles } from '../../constants/styles';

const CalendarPDF = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text>Aucune donnée à afficher</Text>
        </Page>
      </Document>
    );
  }

  return (
    <Document style={styles.document}>
      <CalendarPage data={data} />
    </Document>
  );
};

export default CalendarPDF;
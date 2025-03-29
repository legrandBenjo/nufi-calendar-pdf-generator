import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import NufiCalendarPDF from './NufiCalendarPDF';

const PDFGenerator = ({ data }) => (
  <PDFDownloadLink
    document={<NufiCalendarPDF data={data} />}
    fileName={`calendrier_nufi_${new Date().getFullYear()}.pdf`}
    style={{
      textDecoration: 'none',
      padding: '10px 20px',
      backgroundColor: '#4CAF50',
      color: 'white',
      borderRadius: '4px',
      fontWeight: 'bold',
    }}
  >
    {({ loading }) => (loading ? 'Génération du PDF...' : 'Télécharger le PDF')}
  </PDFDownloadLink>
);

export default PDFGenerator;
import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import NufiCalendarPDF from './NufiCalendarPDF';

const PDFGenerator = ({ data, year }) => {
  return (
    <PDFDownloadLink
      document={<NufiCalendarPDF data={data} />}
      fileName={`calendrier_nufi_${year}.pdf`}
      style={{
        textDecoration: 'none',
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        borderRadius: '4px',
        fontWeight: 'bold',
        marginTop: '20px',
        display: 'inline-block'
      }}
    >
      {({ loading }) => (
        loading ? 'Génération du PDF...' : `Télécharger le PDF pour ${year}`
      )}
    </PDFDownloadLink>
  );
};

export default PDFGenerator;
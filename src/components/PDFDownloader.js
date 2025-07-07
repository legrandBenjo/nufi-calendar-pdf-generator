import React, { useMemo, useState } from 'react';
import { pdf, PDFDownloadLink } from '@react-pdf/renderer';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';
import CalendarPDF from './PDF/CalendarPDF';

import { FileOpener } from '@awesome-cordova-plugins/file-opener';
import { File } from '@awesome-cordova-plugins/file';

function PDFDownloader({ data, calendarType, selectedYear }) {
  const isNative = Capacitor.isNativePlatform();
  const [isGenerating, setIsGenerating] = useState(false);

  const pdfDocument = useMemo(() => (
    <CalendarPDF data={data} />
  ), [data]);

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try {
      const blob = await pdf(pdfDocument).toBlob();

      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = reader.result.split(',')[1];
        const fileName = `calendrier_${calendarType}_${selectedYear}.pdf`;

        await Filesystem.writeFile({
          path: fileName,
          data: base64Data,
          directory: Directory.Documents
        });

        alert('PDF enregistré dans le dossier Documents');

        const uriResult = await Filesystem.getUri({
          directory: Directory.Documents,
          path: fileName,
        });

        const filePath = uriResult.uri;

        FileOpener.open(filePath, 'application/pdf')
          .catch(err => {
            console.warn("Impossible d'ouvrir le PDF :", err);
            alert('PDF enregistré, mais aucune application ne peut l’ouvrir automatiquement.');
          });
      };

      reader.readAsDataURL(blob);
    } catch (err) {
      console.error('Erreur PDF:', err);
      alert('Erreur lors de la génération ou de l’enregistrement du PDF.');
    } finally {
      setIsGenerating(false);
    }
  };

  const buttonStyle = {
    padding: '10px 15px',
    background: isGenerating ? '#90CAF9' : '#2196F3',
    color: 'white',
    textDecoration: 'none',
    borderRadius: 4,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    cursor: isGenerating ? 'not-allowed' : 'pointer',
    opacity: isGenerating ? 0.7 : 1
  };

  const Spinner = () => <span className="spinner" />;

  if (isNative) {
    return (
      <button onClick={handleDownloadPDF} disabled={isGenerating} style={buttonStyle}>
        {isGenerating ? (
          <>
            <Spinner />
            Génération du PDF...
          </>
        ) : (
          `Télécharger le calendrier ${selectedYear} en PDF`
        )}
      </button>
    );
  }

  return (
    <PDFDownloadLink
      document={pdfDocument}
      fileName={`calendrier_${calendarType}_${selectedYear}.pdf`}
      style={buttonStyle}
    >
      {({ loading }) =>
        loading || isGenerating ? (
          <>
            <Spinner />
            Préparation du PDF...
          </>
        ) : (
          `Télécharger le calendrier ${selectedYear} en PDF`
        )
      }
    </PDFDownloadLink>
  );
}

export default PDFDownloader;

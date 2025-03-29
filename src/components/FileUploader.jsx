import React from 'react';
import CSVUploader from './CSVUploader'; // Chemin relatif corrigé
import { parseCSVData } from '../utils/csvParser';

const FileUploader = ({ setCalendarData }) => {
  const handleFileLoaded = (data) => {
    const formattedData = parseCSVData(data);
    setCalendarData(formattedData);
  };

  return (
    <div className="file-uploader">
      <CSVUploader onFileLoaded={handleFileLoaded} />
    </div>
  );
};

export default FileUploader;
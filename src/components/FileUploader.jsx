// FileUploader.jsx
import React from 'react';
import CSVUploader from './CSVUploader';
import { parseCSVData } from '../utils/csvParser';

const FileUploader = ({ setCalendarData, calendarType = 'nufi' }) => {
  const handleFileLoaded = (csvData) => {
    const formattedData = parseCSVData(csvData, calendarType);
    setCalendarData(formattedData);
  };

  return (
    <div className="file-uploader">
      <CSVUploader onFileLoaded={handleFileLoaded} />
    </div>
  );
};

export default FileUploader;
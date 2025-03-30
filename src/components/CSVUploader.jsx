// CSVUploader.jsx
import React from 'react';

const CSVUploader = ({ onFileLoaded, acceptedFormats = '.csv' }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const csvData = event.target.result;
      onFileLoaded(csvData);
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <input
        type="file"
        accept={acceptedFormats}
        onChange={handleFileChange}
        style={{ display: 'block', margin: '10px 0' }}
      />
    </div>
  );
};

export default CSVUploader;
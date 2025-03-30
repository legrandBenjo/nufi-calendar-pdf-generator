import React from 'react';

const CSVUploader = ({ onFileLoaded }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const csvData = event.target.result;
      const rows = csvData.split('\n').map(row => row.split(','));
      onFileLoaded(rows);
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        style={{ display: 'block', margin: '10px 0' }}
      />
    </div>
  );
};

export default CSVUploader;
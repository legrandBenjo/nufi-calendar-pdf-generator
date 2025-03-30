export const parseCSVData = (csvData, calendarType) => {
  const rows = csvData.split('\n').filter(row => row.trim() !== '');
  
  return rows.slice(1).map(row => {
    const parsed = row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || [];
    
    // Extraction des données en fonction du type de calendrier
    const date = parsed[1] ? parsed[1].replace(/^"|"$/g, '') : '';
    const dateParts = date.split(' ');
    const year = dateParts.length >= 3 ? dateParts[2] : '';
    
    const baseData = {
      date,
      year,
      dayEng: parsed[2] ? parsed[2].replace(/^"|"$/g, '') : '',
    };

    // Données spécifiques au type de calendrier
    const specificData = {
      nufi: {
        dayLocal: parsed[3] ? parsed[3].replace(/^"|"$/g, '') : '',
        fullDateLocal: parsed[7] ? parsed[7].replace(/^"|"$/g, '') : '',
      },
      ghomala: {
        dayLocal: parsed[3] ? parsed[3].replace(/^"|"$/g, '') : '',
        fullDateLocal: parsed[7] ? parsed[7].replace(/^"|"$/g, '') : '',
      }
    };

    return {
      ...baseData,
      ...specificData[calendarType],
      calendarType
    };
  });
};
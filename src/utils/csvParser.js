export const parseCSVData = (data) => {
  return data.slice(1).map(row => {
    const csvLine = row.join(',');
    const parsed = csvLine.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || [];
    
    // Extraction de l'année (2ème colonne - format "Month Day Year")
    const dateParts = parsed[1] ? parsed[1].split(' ') : [];
    const year = dateParts.length >= 3 ? dateParts[2] : '';

    return {
      date: parsed[1] ? parsed[1].replace(/^"|"$/g, '') : '',
      year: year,
      dayEng: parsed[2] ? parsed[2].replace(/^"|"$/g, '') : '',
      dayNufi: parsed[3] ? parsed[3].replace(/^"|"$/g, '') : '',
      fullDateNufi: parsed[7] ? parsed[7].replace(/^"|"$/g, '') : ''
    };
  });
};
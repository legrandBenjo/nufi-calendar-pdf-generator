export const parseCSVData = (data) => {
    return data.slice(1).map(row => {
      // Joindre le tableau et reparser en gérant les guillemets
      const csvLine = row.join(',');
      const parsed = csvLine.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || [];
      
      return {
        date: parsed[1] ? parsed[1].replace(/^"|"$/g, '') : '',
        dayEng: parsed[2] ? parsed[2].replace(/^"|"$/g, '') : '',
        dayNufi: parsed[3] ? parsed[3].replace(/^"|"$/g, '') : '',
        fullDateNufi: parsed[9] ? parsed[9].replace(/^"|"$/g, '') : ''
      };
    });
  };
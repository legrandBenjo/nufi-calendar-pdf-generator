import { MONTHS_MAPPING } from '../constants/monthsMapping';

export function getMonthLabel(month, calendarType) {
  const local = MONTHS_MAPPING[calendarType][month];
  // Affiche la langue locale + anglais
  return `${local} / ${month}`;
}
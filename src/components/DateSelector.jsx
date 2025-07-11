import React, { useState, useEffect, useMemo, useCallback } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';
import '../DateSelector.css';
import { monthsFr } from '../constants/monthsFr';

registerLocale('fr', fr);

const isToday = (date) => {
  const today = new Date();
  return (
    date &&
    !isNaN(date) &&
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const DateSelector = ({ selectedDate, onChange, minDate, maxDate, calendarType, calendarData }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [localDate, setLocalDate] = useState(null);
  const [pickerValue, setPickerValue] = useState({ day: '1', month: '1', year: '2023' });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const findLocalDate = useCallback((date) => {
    if (!date || !calendarData?.length) return null;
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();
    const key = `${month} ${day} ${year}`;
    return calendarData.find(item => item.date === key)?.fullDateLocal || null;
  }, [calendarData]);

  useEffect(() => {
    if (!selectedDate || isNaN(selectedDate)) return;
    setPickerValue({
      day: selectedDate.getDate().toString(),
      month: (selectedDate.getMonth() + 1).toString(),
      year: selectedDate.getFullYear().toString(),
    });
    setLocalDate(findLocalDate(selectedDate));
  }, [selectedDate, findLocalDate]);

  const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();

  const optionGroups = useMemo(() => {
    const year = parseInt(pickerValue.year) || new Date().getFullYear();
    const month = parseInt(pickerValue.month) || 1;
    const daysInMonth = getDaysInMonth(year, month);
    return {
      day: Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString()),
      month: monthsFr,
      year: Array.from({ length: 201 }, (_, i) => (1900 + i).toString()),
    };
  }, [pickerValue]);

  const handlePickerChange = (name, value) => {
    const updated = { ...pickerValue, [name]: value };
    setPickerValue(updated);
    const year = parseInt(updated.year);
    const month = parseInt(updated.month) - 1;
    const day = parseInt(updated.day);
    const newDate = new Date(year, month, day);
    if (!isNaN(newDate.getTime()) && newDate.getDate() === day) {
      onChange(newDate);
    }
  };

  const dateFormat = useMemo(() => (isMobile ? 'dd/MM/yyyy' : 'dd MMMM yyyy'), [isMobile]);

  if (!selectedDate || isNaN(selectedDate)) {
    return <div className="date-selector-container">Date invalide</div>;
  }

  // 💡 Ajouter une logique pour vérifier si la date locale est un jour avec alternative
  let decoratedDate = localDate;
  let altLabel = null;
  if (localDate?.includes("Nthʉ̂'ntāā")) {
    decoratedDate = `*${localDate}`;
    altLabel = "Nthʉ̄'ntāā = Líé'ngā'";
  } else if (localDate?.includes("Nshwīe'ko")) {
    decoratedDate = `*${localDate}`;
    altLabel = "Nshwīē'ko = Nzêngoo";
  }

  return (
    <div className="date-selector-container">
      {isToday(selectedDate) && <div className="today-badge">Aujourd'hui</div>}

      <div className="date-display-wrapper">
        {isMobile ? (
          <div className="mobile-select-wrapper">
            <select
              aria-label="Jour"
              value={pickerValue.day}
              onChange={e => handlePickerChange('day', e.target.value)}
            >
              {optionGroups.day.map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>

            <select
              aria-label="Mois"
              value={pickerValue.month}
              onChange={e => handlePickerChange('month', e.target.value)}
            >
              {optionGroups.month.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>

            <select
              aria-label="Année"
              value={pickerValue.year}
              onChange={e => handlePickerChange('year', e.target.value)}
            >
              {optionGroups.year.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        ) : (
          <DatePicker
            selected={selectedDate}
            onChange={onChange}
            minDate={minDate}
            maxDate={maxDate}
            dateFormat={dateFormat}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            locale="fr"
            className="custom-datepicker"
            calendarClassName="custom-calendar"
            popperPlacement="bottom"
            useWeekdaysShort
            shouldCloseOnSelect
          />
        )}

        <div className="native-date-wrapper">
          <div className={localDate ? `native-date ${calendarType}` : 'date-not-found'}>
            {decoratedDate || 'Date non trouvée dans les données'}
          </div>
          {altLabel && (
            <div className="alternate-label">
              <em>{altLabel}</em>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(DateSelector);

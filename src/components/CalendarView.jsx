import React from 'react';

const CalendarView = ({ data }) => {
  return (
    <div className="calendar-preview">
      <h2>Aperçu du Calendrier</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Jour (Anglais)</th>
            <th>Jour (Nufi)</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(0, 5).map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.dayEng}</td>
              <td>{item.dayNufi}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CalendarView;
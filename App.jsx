import React, { useState } from "react";

const months = [
  "Januari", "Februari", "Maart", "April", "Mei", "Juni",
  "Juli", "Augustus", "September", "Oktober", "November", "December"
];

const days = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function MonthlyPlanner() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [notes, setNotes] = useState({});

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const offset = (firstDay + 6) % 7;

  const handleDayClick = (day) => {
    const key = `${currentYear}-${currentMonth + 1}-${day}`;
    const existingNote = notes[key] || "";
    const newNote = window.prompt("Notitie voor deze dag:", existingNote);
    if (newNote !== null) {
      setNotes({ ...notes, [key]: newNote });
    }
  };

  const prevMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    if (currentMonth === 0) setCurrentYear((y) => y - 1);
  };

  const nextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    if (currentMonth === 11) setCurrentYear((y) => y + 1);
  };

  const dates = Array(offset).fill(null).concat(
    Array.from({ length: daysInMonth }, (_, i) => i + 1)
  );

  return (
    <div className="calendar">
      <div className="controls">
        <button onClick={prevMonth}>←</button>
        <h2>{months[currentMonth]} {currentYear}</h2>
        <button onClick={nextMonth}>→</button>
      </div>
      <div className="grid">
        {days.map((d) => <div key={d}><strong>{d}</strong></div>)}
        {dates.map((day, idx) => {
          const key = `${currentYear}-${currentMonth + 1}-${day}`;
          const note = notes[key];
          return (
            <div
              key={idx}
              onClick={() => day && handleDayClick(day)}
              className="day"
              style={{ background: day ? "#fff" : "#eee", padding: "5px", cursor: "pointer" }}
            >
              {day && <strong>{day}</strong>}
              {note && <div style={{ fontSize: "0.8em", marginTop: "5px" }}>📝 {note}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>📘 Lesmateriaal PAV & NCZ</h1>
      <MonthlyPlanner />
    </div>
  );
}

import React, { createContext, useState } from "react";

export const TimetableContext = createContext(null);

export const TimetableProvider = ({ children }) => {
  const [timetable, setTimetable] = useState([]); 
  const [registrationCounts, setRegistrationCounts] = useState({}); 
  const [clashReport, setClashReport] = useState([]); 

  // Add timetable from CSV rows
  const addTimetable = (rows) => {
    if (!rows || rows.length < 2) return;

    const headers = rows[0].map(h => h.trim());
    const dataRows = rows.slice(1);

    const parsed = dataRows.map(row => {
      let obj = {};
      headers.forEach((h, i) => {
        obj[h] = row[i] ? row[i].trim() : "";
      });
      return obj;
    });

    setTimetable(parsed);
    generateClashReport(parsed, registrationCounts);
  };

  // Add registration counts CSV
  const addRegistrationCounts = (rows) => {
    if (!rows || rows.length < 2) return;

    const headers = rows[0].map(h => h.trim());
    const dataRows = rows.slice(1);

    const counts = {};
    dataRows.forEach(row => {
      const course = row[headers.indexOf("Course")] || row[1] || "Unknown";
      const section = row[headers.indexOf("Section")] || row[2] || "0";
      const students = parseInt(row[headers.indexOf("Students")] || row[3] || "0", 10);
      counts[`${course}-${section}`] = students;
    });

    setRegistrationCounts(counts);
    generateClashReport(timetable, counts);
  };

  // Generate clash report based on timetable & registration counts
  const generateClashReport = (tt, counts) => {
    if (!tt || tt.length === 0) {
      setClashReport([]);
      return;
    }

    const clashes = tt.map(slot => {
      const key = `${slot.Day || slot.day || "undefined"}-${slot.Time || slot.time || "undefined"}-${slot.Room || slot.room || "undefined"}`;
      const courseSection = `${slot["Course Name"] || slot.course || "Unknown"}-${slot.Section || slot.section || "0"}`;
      const students = counts[courseSection] || 0;

      return { key, courseSection, students };
    });

    setClashReport(clashes);
  };

  return (
    <TimetableContext.Provider
      value={{
        timetable,
        setTimetable,
        registrationCounts,
        setRegistrationCounts,
        clashReport,
        setClashReport,
        addTimetable,
        addRegistrationCounts
      }}
    >
      {children}
    </TimetableContext.Provider>
  );
};
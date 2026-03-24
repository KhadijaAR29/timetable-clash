import React, { useContext } from "react";
import { TimetableContext } from "../context/contextTT";

const UploadClashReport = () => {
  const { setClashReport } = useContext(TimetableContext);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.endsWith(".csv")) {
      alert("Please upload a CSV file only");
      return;
    }

    const reader = new FileReader();

    reader.onload = (evt) => {
      const text = evt.target.result;

      if (!text) {
        alert("File is empty or could not be read.");
        return;
      }

      const rows = text
        .trim()
        .split("\n")
        .map(row => row.split(","))
        .filter(row => row.length > 1 || (row.length === 1 && row[0].trim() !== ""));

      if (rows.length === 0) {
        alert("No valid data found in CSV.");
        return;
      }

      setClashReport(rows);
    };

    reader.onerror = () => {
      alert("Error reading file.");
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <h3>Upload Clash Report (CSV only)</h3>
      <input type="file" accept=".csv" onChange={handleUpload} />
    </div>
  );
};

export default UploadClashReport;
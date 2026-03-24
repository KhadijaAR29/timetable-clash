import { useState, useCallback } from "react";

function useFileReader() {
  const [data, setData] = useState([]);

  const readFile = useCallback((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.split("\n").filter(Boolean);
      const parsed = lines.slice(1).map(line => { // skip header
        const [course, day, time, venue] = line.split(",");
        return { course, day, time, venue };
      });
      setData(parsed);
    };
    reader.readAsText(file);
  }, []);

  return { data, readFile };
}

export default useFileReader;
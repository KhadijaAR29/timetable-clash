import React, { useContext, useState } from "react";
import { TimetableContext } from "../context/contextTT";

const colors = ["#f28b82", "#fbbc04", "#fff475", "#ccff90", "#a7ffeb", "#cbf0f8", "#aecbfa", "#d7aefb"];

const ViewTT = () => {
  const { timetable, clashReport, generateClashes } = useContext(TimetableContext);
  const [showOnlyClashes, setShowOnlyClashes] = useState(false);

  // Assign color per clash
  const slotColorMap = {};

  const toggleShowClashes = () => {
    generateClashes(); // recompute clashes before filtering
    setShowOnlyClashes(!showOnlyClashes);
  };

  const getSlotClashCount = (row) => {
    if (!clashReport || clashReport.length === 0 || !row) return 0;

    let count = 0;
    clashReport.forEach((clash) => {
      row.forEach((cell) => {
        if (clash.courses.includes(cell)) count += clash.students;
      });
    });
    return count;
  };

  const renderTable = (data) => {
    if (!data || data.length === 0) return <p>No data uploaded.</p>;

    return (
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            {data[0].map((h, i) => (
              <th key={i}>{h}</th>
            ))}
            <th>Total Clashing Students</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(1)
            .filter((row) => {
              if (!showOnlyClashes) return true;
              return getSlotClashCount(row) > 0;
            })
            .map((row, r) => {
              const hasClash = row.some((cell) =>
                clashReport.some((c) => c.courses.includes(cell))
              );
              if (hasClash && !slotColorMap[r]) slotColorMap[r] = colors[r % colors.length];

              return (
                <tr key={r}>
                  {row.map((cell, c) => {
                    const isClash = clashReport.some((cl) => cl.courses.includes(cell));
                    return (
                      <td
                        key={c}
                        style={{
                          backgroundColor: isClash && hasClash ? slotColorMap[r] : "white",
                        }}
                      >
                        {cell}
                      </td>
                    );
                  })}
                  <td>{getSlotClashCount(row)}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h3>Timetable</h3>
      <button onClick={toggleShowClashes}>
        {showOnlyClashes ? "Show All" : "Show Only Clashes"}
      </button>
      {renderTable(timetable)}

      <h3>Clash Report</h3>
      {renderTable(clashReport.map((c) => [c.courses.join(", "), c.day, c.time, c.students]))}
    </div>
  );
};

export default ViewTT;
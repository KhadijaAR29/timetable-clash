import { useMemo } from "react";

export const useClashFilter = (timetable, clashReport) => {
  return useMemo(() => {
    if (!clashReport.length) return [];

    return timetable.map(course => {
      const clash = clashReport.find(c => c.course === course.course);
      return { ...course, clashCount: clash ? parseInt(clash.count) : 0 };
    });
  }, [timetable, clashReport]);
};
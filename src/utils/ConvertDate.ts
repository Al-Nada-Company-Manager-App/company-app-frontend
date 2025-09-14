export type ConvertDateOptions = {
  locale?: string; // default 'en-GB' (DD/MM/YYYY style)
  withTime?: boolean; // include time (hours:minutes)
};

/**
 * Convert various timestamp/date representations to a readable date string.
 * Handles: Date, ISO string, "YYYY-MM-DD", "YYYY-MM-DD HH:mm:ss", numeric (seconds or ms).
 */
export function convertTimestampToDate(
  value?: string | number | Date | null,
  options?: ConvertDateOptions
): string {
  const { locale = "en-GB", withTime = false } = options || {};

  if (value === undefined || value === null || value === "") return "";

  let dateObj: Date;

  if (value instanceof Date) {
    dateObj = value;
  } else if (typeof value === "number") {
    // If timestamp looks like seconds (<= 1e12) convert to ms
    const ms = value > 1e12 ? value : value * 1000;
    dateObj = new Date(ms);
  } else if (typeof value === "string") {
    const s = value.trim();

    // numeric string? treat as timestamp
    if (/^\d+$/.test(s)) {
      const n = Number(s);
      const ms = n > 1e12 ? n : n * 1000;
      dateObj = new Date(ms);
    } else {
      // try ISO or SQL datetime (convert space -> 'T')
      const iso = s.includes(" ") && !s.includes("T") ? s.replace(" ", "T") : s;
      dateObj = new Date(iso);

      // fallback: try Date.parse
      if (isNaN(dateObj.getTime())) {
        const parsed = Date.parse(s);
        dateObj = isNaN(parsed) ? new Date(NaN) : new Date(parsed);
      }
    }
  } else {
    return "";
  }

  if (isNaN(dateObj.getTime())) return "";

  if (withTime) {
    return dateObj.toLocaleString(locale, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return dateObj.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

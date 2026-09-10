/**
 * Clean and parse height array or string into standard centimeters (number)
 */
export function parseHeight(heightArray) {
  if (!heightArray || !Array.isArray(heightArray) || heightArray.length < 2) {
    return -1;
  }
  const cmStr = heightArray[1]; // e.g., "185 cm"
  const parsed = parseInt(cmStr, 10);
  return isNaN(parsed) || parsed <= 0 ? -1 : parsed;
}

/**
 * Clean and parse weight array or string into standard kilograms (number)
 */
export function parseWeight(weightArray) {
  if (!weightArray || !Array.isArray(weightArray) || weightArray.length < 2) {
    return -1;
  }
  const kgStr = weightArray[1]; // e.g., "85 kg"
  const parsed = parseInt(kgStr, 10);
  return isNaN(parsed) || parsed <= 0 ? -1 : parsed;
}

/**
 * Handle missing or null text fields safely
 */
export function parseString(value) {
  if (!value || value === "-" || value === "null") {
    return "Unknown";
  }
  return value.trim();
}

/**
 * Format a height/weight tuple (e.g. ["6'2", "185 cm"]) for display,
 * falling back to "Unknown" for missing or sentinel zero values.
 */
export function formatMeasurement(measureArray) {
  if (!Array.isArray(measureArray) || measureArray.length < 2) {
    return "Unknown";
  }
  const raw = measureArray[1];
  if (!raw || raw === "-" || raw === "null") {
    return "Unknown";
  }
  const parsed = parseInt(raw, 10);
  if (isNaN(parsed) || parsed <= 0) {
    return "Unknown";
  }
  return raw;
}

/**
 * Format a powerstat value for display, falling back to "Unknown" for
 * missing values (the source API uses -1 as a sentinel for "no data").
 */
export function formatStat(value) {
  if (value === null || value === undefined || value < 0) {
    return "Unknown";
  }
  return value;
}
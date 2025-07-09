// Format as YYYY-MM-DDTHH:mm
export const formatDateTimeForInput = (
  date: Date | string | null
): string | null => {
  if (!date) return null;

  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toISOString().slice(0, 16); // Remove seconds & timezone
};

// Format as YYYY-MM-DD
export const formatDateForInput = (date: Date | string): string => {
  const parsedDate = typeof date === 'string' ? new Date(date) : date;

  const offset = parsedDate.getTimezoneOffset();
  const localDate = new Date(parsedDate.getTime() - offset * 60000); // Local time correction
  return localDate.toISOString().split('T')[0]; // Format: 'YYYY-MM-DD
};

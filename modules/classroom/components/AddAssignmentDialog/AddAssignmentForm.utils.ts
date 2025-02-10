export const formatForDateTimeLocal = (dateInput: Date | string) => {
    const date = new Date(dateInput); // Convert to Date object first
    const pad = (num: number) => String(num).padStart(2, '0');
    
    return [
      date.getFullYear(),
      pad(date.getMonth() + 1),
      pad(date.getDate()),
    ].join('-') + 'T' + [
      pad(date.getHours()),
      pad(date.getMinutes())
    ].join(':');
 };
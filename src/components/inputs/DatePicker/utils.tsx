
  export const parseInputDate = (text: string): Date | null => {
    const [day, month, year] = text.split('/').map(Number);
    if (day && month && year) {
      const date = new Date(year, month - 1, day);
      if (!isNaN(date.getTime())) {
        return date;
      }
    }
    return null;
  };
  export enum DateFormat {
    DISPLAY = "dd/MM/yyyy",
    // react-native-calendars keys markedDates by ISO date
    KEY = "yyyy-MM-dd",
  }
const DateToString = (date: Date, format: string = 'd/m/Y'): string => {
  return format
    .replace('d', date.getDate().toString().padStart(2, '0'))
    .replace('m', (date.getMonth() + 1).toString().padStart(2, '0'))
    .replace('Y', date.getFullYear().toString().padStart(2, '0'));
}

export default DateToString;
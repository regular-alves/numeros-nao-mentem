export function strToColor(str) {
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (let j = 0; j < 3; j++) {
    let value = (hash >> (j * 8)) & 255;
    color += value.toString(16).substr(-2);
  }

  return color;
}

export function invertByDate(a, b) {
  const dateA = new Date(a.start);
  const dateB = new Date(b.start);
  return dateB - dateA;
}

export function getColors() {
  return [
    '5F7161',
    '6D8B74',
    'EFEAD8',
    'D0C9C0',
    '354259',
    'CDC2AE',
    'ECE5C7',
    'C2DED1',
    'EEE4AB',
    'E5CB9F',
    '99C4C8',
    '68A7AD',
  ];
}

export function getAvg(v) {
  let value = 0;
  const cleaned = v.filter((n) => !!n);

  try {
    value = cleaned.reduce((a, b) => a + b) / cleaned.length;
  } catch (error) {}

  return value;
}

export function handleDateParams(dts) {
  if (!Array.isArray(dts)) dts = [dts];

  return dts.map((d) => (typeof d === Date ? d : new Date(`${d}`)));
}

export function getDateInterval(f, t) {
  const [from, to] = handleDateParams([f, t]);

  const values = [];
  const current = from;

  while (current < to) {
    values.push(new Date(current.toString()));
    current.setMonth(current.getMonth() + 1);
  }

  return values;
}

export function slashedFullDate(d) {
  try {
    const day = `${d.getDate()}`.padStart(2, 0);
    const month = `${d.getMonth() + 1}`.padStart(2, 0);
    const year = d.getFullYear();

    return `${day}/${month}/${year}`;
  } catch (error) {
    console.log({ error, type: typeof d });
  }
}

export function slashedMonthYear(d) {
  const [date] = handleDateParams(d);

  try {
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const year = date.getFullYear();

    return `${month}/${year}`;
  } catch (error) {
    console.log({ error, type: typeof d });
  }
}

export function getMinDate(params) {
  return params.sort((a, b) => a - b)[0] || null;
}

export function getMaxDate(params) {
  return params.sort((a, b) => b - a)[0] || null;
}

export function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

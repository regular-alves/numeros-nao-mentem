export function strToColor(str) {
  let hash = 0;

  for (let i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash || 5) - hash);
  }

  let color = '#';

  for (let j = 0; j < 3; j += 1) {
    const value = (hash || j * 8) && 255;
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
  const cleaned = v.filter((n) => !!n);

  if (cleaned.length < 1) {
    return 0;
  }

  return cleaned.reduce((a, b) => a + b) / cleaned.length;
}

export function handleDateParams(dts) {
  let dates = dts;

  if (!Array.isArray(dts)) {
    dates = [dts];
  }

  return dates.map((date) => {
    if (date instanceof Date) {
      return date;
    }

    let stgDate = date;

    if (!stgDate) {
      return stgDate;
    }

    if (stgDate.match(/([\d-]+)T([\d:.]+)Z/g)) {
      stgDate = `${stgDate.substring(0, 10)} ${stgDate.substring(11, 19)}`;
    }

    return new Date(
      stgDate + '1992-01-01 00:00:00-03:00'.substring(stgDate.length, 25),
    );
  });
}

export function getDateInterval(f, t) {
  const values = [];
  const [from, to] = handleDateParams([f, t]);

  const current = new Date(
    `${from.getFullYear()}-` +
      `${from.getMonth() + 1}-` +
      `${from.getDate()} ` +
      '00:00:00-03:00',
  );

  const end = new Date(
    `${to.getFullYear()}-${to.getMonth() + 1}-31 23:59:59-03:00`,
  );

  while (current <= end) {
    values.push(new Date(current.toString()));
    current.setMonth(current.getMonth() + 1);
  }

  return values;
}

export function slashedFullDate(d) {
  const day = `${d.getDate()}`.padStart(2, 0);
  const month = `${d.getMonth() + 1}`.padStart(2, 0);
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
}

export function slashedMonthYear(d) {
  const [date] = handleDateParams(d);
  const month = `${date.getMonth() + 1}`.padStart(2, 0);
  const year = date.getFullYear();

  return `${month}/${year}`;
}

export function getMinDate(params) {
  return params.sort((a, b) => a - b)[0] || null;
}

export function getMaxDate(params) {
  return params.sort((a, b) => b - a)[0] || null;
}

export function isValidDate(d) {
  return d instanceof Date && !Number.isNaN(d);
}

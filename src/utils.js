const strToColor = str => {
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  let color = '#';

  for (let j = 0; j < 3; j++) {
    let value = (hash >> (j * 8)) & 255;
    color += (value.toString(16)).substr(-2);
  }

  return color;
}

const invertByDate = (a, b) => {
  const dateA = new Date(a.start);
  const dateB = new Date(b.start);
  return dateB - dateA;
};

const getColors = () => [
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
  '68A7AD'
];

const getAvg = ( v ) => {
  let value = 0;
  const cleaned = v.filter( n => !!n );

  try {
    value = cleaned.reduce((a, b) => a + b) / cleaned.length;
  } catch (error) {}

  return value;
}

const handleDateParams = (dts) => {
  if(!Array.isArray(dts)) dts = [dts];

  return dts.map(d => typeof d === Date ? d : new Date(`${d}`));
}

const getDateInterval = (f, t) => {
  const [from, to] = handleDateParams([f, t]);
  
  const values = [];
  const current = from;

  while( current < to ) {
    values.push(new Date(current.toString()));
    current.setMonth(current.getMonth() + 1);
  }

  return values;
}

const slashedFullDate = d => {
  try {
    const day = `${d.getDate()}`.padStart(2, 0);
    const month = `${d.getMonth() + 1}`.padStart(2, 0);
    const year = d.getFullYear();

    return `${day}/${month}/${year}`;
  } catch (error) {
    console.log({error, type: typeof d});
  }
}

const slashedMonthYear = d => {
  try {
    const month = `${d.getMonth() + 1}`.padStart(2, 0);
    const year = d.getFullYear();

    return `${month}/${year}`;
  } catch (error) {
    console.log({error, type: typeof d});
  }
}

const getMinDate = params => {
  return params.sort((a,b) => a - b)[0] || null;
}

const getMaxDate = params => {
  return params.sort((a,b) => b - a)[0] || null;
}
export {
  strToColor,
  invertByDate,
  getColors,
  getAvg,
  handleDateParams,
  getDateInterval,
  slashedFullDate,
  slashedMonthYear,
  getMinDate,
  getMaxDate
};
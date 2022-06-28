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

const handleDateParams = (f, t) => {
  return [
    typeof f === Date ? f : new Date(`${f}`),
    typeof t === Date ? t : new Date(`${t}`)
  ]
}

const getDateInterval = (f, t) => {
  const [from, to] = handleDateParams(f, t);
  
  const values = [];
  const current = from;

  while( current < to ) {
    values.push(current.toString());
    current.setMonth(current.getMonth() + 1);
  }

  return values.map(d => new Date(d));
}

const slashedDate = date => {
  const day = (date.toDate()).padStart(2, 0);
  const month = (date.toMonth() + 1).padStart(2, 0);
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export {
  strToColor,
  invertByDate,
  getColors,
  getAvg,
  handleDateParams,
  getDateInterval,
  slashedDate
};
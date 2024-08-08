
type PlotBand = {
  from: number;
  to: number;
  color: string;
  slug: string;
  label: {
      text: string;
      align: 'left' | 'center' | 'right';
      x: number;
  }
} 

export default PlotBand;
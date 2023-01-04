import dataSet from '../DataSets/deforestation.json';
import DataCollection from './DataCollection';

export default class DeforestationTotal extends DataCollection {
  constructor() {
    super(dataSet.series.total, dataSet.sources);
  }
}

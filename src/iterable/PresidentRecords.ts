import PresidentRecord from "@naoMentem/dtos/PresidentRecord";
import PlotBand from "@naoMentem/dtos/PlotBand";
import Tuple from "./Tuple";
import stringToColor from "@naoMentem/utils/stringToColor";

export default class PresidentRecords extends Tuple<PresidentRecord> {
  constructor(
	protected values: PresidentRecord[], 
	protected min: number, 
	protected max: number
) {
	super(
		values.sort((a, b) => a.start.getTime() - b.start.getTime()),
		new Date(max)
	);

	if (values.filter((r: PresidentRecord) => !r.end).length > 1) {
		throw new RangeError('Your dataset must not have more than one non-ended record')
	}
  }

  protected filter(record: PresidentRecord, start: Date, end: Date): boolean {
	  return (!record.end || (record.end && record.end >= start))
		  && record.start < end;
  }

  get(start: Date, end: Date): PresidentRecords {
	  return new PresidentRecords(
		  this.values.filter(
				(record) => this.filter(record, start, end)
		  ),
		  start.getTime(),
		  end.getTime()
	  );
  }

  toSeries(): PresidentRecord[] {
	  const recordSet: PresidentRecord[] = []
	  
	  this.values.forEach(record => {
			const min = Math.max(...[this.min, record.start.getTime()]);
			const max = Math.min(...[this.max, (record.end?.getTime() || Number.MAX_SAFE_INTEGER)]);
			
		  const current = new Date(min);
		  const end = new Date(max);
		  
		  while (current < end) {
			  recordSet.push(record);
			  current.setMonth(current.getMonth() + 1);
			  current.setDate(1);
		  }
	  });

	  return recordSet;
  }

  all(): PresidentRecords {
		const { min, max } = this.getMinMaxFrom(this.values);

	  return new PresidentRecords(this.values, min, max);
  }

	private getMinMaxFrom(values: PresidentRecord[]) {
		return {
			min: values.reduce((acc: any, cur) => {
					if (!acc) {
						return cur.start.getTime();
					}
		
					if (acc > cur.start.getTime()) {
						return cur.start.getTime();
					}
		
					return acc;
				}, null),
			max: values.reduce((acc: any, cur) => {
				const date = (cur.end || cur.start).getTime();

				if (!acc) {
					return date;
				}
	
				if (acc < date) {
					return date;
				}
	
				return acc;
			}, 0),
		};
	}

  toPlotBands(): PlotBand[] {
		const resultSet: PlotBand[] = [];

		this.values.forEach((record, key) => {
			const start_time = Math.max(record.start.getTime(), this.min);
			const end_time = Math.min((record.end?.getTime() || Number.MAX_SAFE_INTEGER), this.max);
			const current = new Date(start_time);
			const end = new Date(end_time);
			
			while (end && current <= end) {
				const last = resultSet.length ? (resultSet.length - 1) : 0;

				if (record.slug === resultSet[last]?.slug) {
					resultSet[last].to++;
				}else{
					resultSet.push({
						from: resultSet[last] ? resultSet[last].to : 0,
						to: resultSet[last] ? resultSet[last].to : 0,
						color: stringToColor(record.slug) + '50',
						slug: record.slug,
						label: {
							text: record.knownAs,
							align: 'left',
							x: 15,
						}
					});
				}
				
				current.setMonth(current.getMonth() + 1);
				current.setDate(1);
			}
		});

		return resultSet;
  }
}
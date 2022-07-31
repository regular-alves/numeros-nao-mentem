import FoodBasket from './FoodBasket';
import Salary from './Salary';
import { getDateInterval, handleDateParams } from '../utils';

class FoodVsSalary {
  foodBasket = null;

  salary = null;

  constructor() {
    this.foodBasket = new FoodBasket();
    this.salary = new Salary();
  }

  getPeriod(f, t) {
    const [from, to] = handleDateParams([f, t]);

    const values = [];
    const dates = getDateInterval(from, to);
    const food = this.foodBasket.getPeriodValues(from, to);
    const salary = this.salary.getPeriodSeries(from, to);

    for (let i = 0; i < dates.length; i += 1) {
      if (
        !Number.isNaN(food[i]) &&
        !Number.isNaN(salary[i]) &&
        food[i] > 0 &&
        salary[i] > 0
      ) {
        const percent = (food[i] / salary[i]) * 100;

        values.push({
          date: dates[i],
          value: parseFloat(percent.toFixed(2)),
        });
      }
    }

    return values;
  }

  getPeriodValues(f, t) {
    const [from, to] = handleDateParams([f, t]);

    return this.getPeriod(from, to).map((v) => v.value);
  }

  getSources() {
    return [...this.foodBasket.getSources(), this.salary.getSources()];
  }
}

export default FoodVsSalary;

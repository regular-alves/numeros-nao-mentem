import FoodBasket from "./FoodBasket";
import Salary from "./Salary";
import { getDateInterval } from "../utils";

class FoodVsSalary {
  foodBasket = null;
  salary = null;

  constructor() {
    this.foodBasket = new FoodBasket();
    this.salary = new Salary();
  }

  getPeriod(f, t) {
    const values = [];
    const dates = getDateInterval(f, t);
    const food = this.foodBasket.getPeriodValues(f,t);
    const salary = this.salary.getPeriodSeries(f,t);

    for (let i = 0; i < dates.length; i++) {
      if(isNaN(food[i]) || isNaN(salary[i])) {
        continue;
      }

      if(!food[i] > 0 || !salary[i]) {
        continue;
      }

      
      const percent = (food[i] / salary[i]) * 100;
      
      values.push({
        date: dates[i],
        value: parseFloat(percent.toFixed(2))
      });      
    }

    return values;
  }

  getPeriodValues(f, t) {
    return this.getPeriod(f, t)
      .map(v => v.value);
  }
}

export default FoodVsSalary;
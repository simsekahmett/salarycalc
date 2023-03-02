import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'salarycalc';

  baseSalary!: number;
  currencyValue!: number;
  foodAllowancePricePerDay!: number;
  numberOfWorkingDaysInPreviousMonth!: number;
  privatePension!: number;
  currencyConverted!: number;
  overallFoodAllowance!: number;
  receivedSalary!: number;
  totalSalary: number = 0;
  difference: number = 0;

  ngOnInit() {
    this.numberOfWorkingDaysInPreviousMonth = this.getWorkingDaysInPrevMonth();
  }

  constructor() {
  }

  calculateSalary() {
    this.currencyConverted = this.baseSalary * this.currencyValue;
    this.overallFoodAllowance = this.foodAllowancePricePerDay * this.numberOfWorkingDaysInPreviousMonth;
    this.totalSalary = this.currencyConverted + this.overallFoodAllowance - this.privatePension;
    this.difference = this.totalSalary - this.receivedSalary;
  }

  getWorkingDaysInPrevMonth(): number {
    const currentDate = moment();
    const prevMonthDate = moment(currentDate).subtract(1, 'months');
    const daysInMonth = prevMonthDate.daysInMonth();
    let workingDays = 0;

    for (let day = 1; day <= daysInMonth; day++) {
      const date = moment(prevMonthDate).date(day);

      if (date.isoWeekday() !== 6 && date.isoWeekday() !== 7) {
        workingDays++;
      }
    }

    return workingDays;
  }
}

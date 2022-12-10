import { getYear } from './utils/getYear.utils.js';
import { getDate } from './utils/getDate.utils.js';
import { calcYear } from './utils/calcYear.utils.js';
import { calcMonth } from './utils/calcMonth.utils.js';
import { calcDay } from './utils/calcDay.utils.js';
import { getCurrentMonthArr } from './utils/getCurrentMonthArr.utils.js';
import {
  getPrevOffsetDays,
  getPastOffsetDays,
} from './utils/getOffsetDays.utils.js';

class Datepicker {
  constructor(startYear, endYear) {
    this.startYear = startYear;
    this.endYear = endYear;
    this.selectInput = document.getElementById('selectYear');
    this.lineWeek = document.getElementById('lineWeek');
    this.selectMonth = document.getElementById('selectMonth');
    this.blockDays = document.getElementById('blockDays');
    this.weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    this.months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    this.monthDays = null;
    this.currentDate = new Date();
  }

  static renderTemplate(parent = 'app') {
    const template = `
    <div class="wrap" id="wrap">
      <div class="date-picker">
        <input class="field" type="text" name="date" />
        <div class="date-picker__head">
          <button class="date-picker__prev"></button>
          <div class="date-picker__date">
            <select class="date-picker__month-select select-month" id="selectMonth">
            </select>
            <select class="date-picker__year-select select-year" id="selectYear">
            </select>
          </div>
          <button class="date-picker__next"></button>
        </div>
        <div class="date-picker__body">
          <ul class="date-picker__week-line line-week" id="lineWeek""">
          </ul>
          <div class="date-picker__days-block block-days" id="blockDays">
          </div>
        </div>
        <div class="date-picker__controls controls-picker">
          <button class="controls-picker__btn controls-picker__btn--clear">
            Clear
          </button>
          <button class="controls-picker__btn controls-picker__btn--accept">
            Accept
          </button>
        </div>
      </div>
    </div>`;

    const parentNode = document.getElementById(parent);
    if (!!parentNode) parentNode.innerHTML = template;
  }

  renderYear() {
    for (let i = getYear(this.startYear); i <= getYear(this.endYear); i += 1) {
      const optionItem = document.createElement('option');

      optionItem.value = i;
      optionItem.textContent = i;
      optionItem.className = 'select-year__item';

      if (!!this.selectInput) {
        this.selectInput.insertAdjacentElement('beforeend', optionItem);
      }
    }
  }

  renderMonths() {
    for (let i = 0; i < this.months.length - 1; i += 1) {
      const monthsItem = document.createElement('option');

      monthsItem.value = this.months[i];
      monthsItem.textContent = this.months[i];
      monthsItem.className = 'select-month__item';

      if (!!this.selectMonth) {
        this.selectMonth.insertAdjacentElement('beforeend', monthsItem);
      }
    }
  }

  renderWeek() {
    for (let i = 0; i < this.weekDays.length; i += 1) {
      const weekItem = document.createElement('li');

      weekItem.textContent = this.weekDays[i];
      weekItem.className = 'line-week__item';

      if (!!this.lineWeek) {
        this.lineWeek.insertAdjacentElement('beforeend', weekItem);
      }
    }
  }
  renderDays() {
    const dayArr = getCurrentMonthArr(this.currentDate);

    this.monthDays = getPrevOffsetDays(dayArr)
      .concat(dayArr)
      .concat(getPastOffsetDays(dayArr));

    let daysRow = document.createElement('ul');
    daysRow.className = 'block-days__row';

    for (let i = 0; i < this.monthDays.length; i += 1) {
      const daysItem = document.createElement('li');

      daysItem.textContent = getDate(this.monthDays[i]).day;
      daysItem.className = 'block-days__item';

      if (getDate(this.currentDate).day === getDate(this.monthDays[i]).day) {
        daysItem.className = 'block-days__item block-days__item--today';
      }

      daysRow.appendChild(daysItem);

      if ((i > 1 && (i + 1) % 7 === 0) || this.monthDays.length - 1 === i) {
        if (!!this.blockDays) {
          this.blockDays.insertAdjacentElement('beforeend', daysRow);
        }

        daysRow = document.createElement('ul');
        daysRow.className = 'block-days__row';
      }
    }
  }

  render() {
    this.renderYear();
    this.renderMonths();
    this.renderWeek();
    this.renderDays();
  }
}

window.addEventListener('load', () => {
  Datepicker.renderTemplate();
  const datepicker = new Datepicker('2022-12-08', '2024-12-08');
  datepicker.render();
});

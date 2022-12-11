import { getDateFromStr } from './utils/getDateFromStr.utils.js';
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
    this.yearNode = document.getElementById('selectYear');
    this.lineWeek = document.getElementById('lineWeek');
    this.monthNode = document.getElementById('selectMonth');
    this.blockDays = document.getElementById('blockDays');
    this.prevBtn = document.getElementById('prevBtn');
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
    this.from = null;
    this.to = null;
    this.monthDays = null;
    this.currentDate = new Date();
  }

  static renderTemplate(parent = 'app') {
    const template = `
    <div class="wrap" id="wrap">
      <div class="date-picker">
        <input class="field" type="text" name="date" />
        <div class="date-picker__head">
          <button class="date-picker__prev" id="prevBtn"></button>
          <div class="date-picker__date">
            <div class="date-picker__month-select select-month" id="selectMonth">
            </div>
            <div class="date-picker__year-select select-year" id="selectYear">
            </div>
          </div>
          <button class="date-picker__next" id="nextBtn"></button>
        </div>
        <div class="date-picker__body">
          <ul class="date-picker__week-line line-week" id="lineWeek">
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
    const { year: currentYear, month: currentMonth } = getDate(
      this.currentDate
    );
    const { year, month } = getDate(new Date());

    if (year === currentYear && month === currentMonth) {
      this.prevBtn.disabled = true;
    } else {
      this.prevBtn.disabled = false;
    }

    const yearNode = document.createElement('div');

    yearNode.value = currentYear;
    yearNode.textContent = currentYear;
    yearNode.className = 'select-year__item';

    if (!!this.yearNode) {
      this.yearNode.innerHTML = '';
      this.yearNode.appendChild(yearNode);
    }
  }

  renderMonths() {
    const currentMonth = getDate(this.currentDate).month;
    const monthsElem = document.createElement('div');

    monthsElem.value = this.months[currentMonth];
    monthsElem.textContent = this.months[currentMonth];
    monthsElem.className = 'select-month__item';

    if (!!this.monthNode) {
      this.monthNode.innerHTML = '';
      this.monthNode.append(monthsElem);
    }
  }

  renderWeek() {
    this.lineWeek.innerHTML = '';
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
    this.blockDays.innerHTML = '';
    const todayDate = new Date();
    const {
      year: todayYear,
      month: todayMonth,
      day: todayDay,
    } = getDate(todayDate);
    const dayArr = getCurrentMonthArr(this.currentDate);

    this.monthDays = getPrevOffsetDays(dayArr)
      .concat(dayArr)
      .concat(getPastOffsetDays(dayArr));

    let daysRow = document.createElement('ul');
    daysRow.className = 'block-days__row';

    for (let i = 0; i < this.monthDays.length; i += 1) {
      const daysItem = document.createElement('li');
      const {
        year: currentYear,
        month: currentMonth,
        day: currentDay,
      } = getDate(this.monthDays[i]);

      daysItem.textContent = getDate(this.monthDays[i]).day;
      daysItem.className = 'block-days__item';

      if (this.monthDays[i] < todayDate) {
        daysItem.setAttribute('data-date', 'disabled');
      } else {
        daysItem.setAttribute(
          'data-date',
          `${currentYear}-${currentMonth + 1}-${currentDay}`
        );
      }

      if (
        todayYear === currentYear &&
        todayMonth === currentMonth &&
        todayDay === currentDay
      ) {
        daysItem.className = 'block-days__item block-days__item--today';
        daysItem.setAttribute(
          'data-date',
          `${currentYear}-${currentMonth + 1}-${currentDay}`
        );
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

  changeMonth(sign = 'inc') {
    if (sign === 'inc') this.currentDate = calcMonth(this.currentDate);
    if (sign === 'dec') this.currentDate = calcMonth(this.currentDate, 'dec');
    this.render();
  }

  pickDate(target) {
    const {
      dataset: { date: pickedDate },
    } = target;
    if (pickedDate !== 'disabled') {
      if (!this.from) {
        this.from = pickedDate;
        target.classList.add('block-days__item--from');
      } else if (
        Date.parse(pickedDate) > Date.parse(this.from) && !this.to
        ) {
        this.to = pickedDate;
        target.classList.add('block-days__item--to');
      }
    }
  }
}

window.addEventListener('load', () => {
  Datepicker.renderTemplate();
  const datepicker = new Datepicker('2022-12-08', '2024-12-08');
  datepicker.render();

  document.addEventListener('click', ({ target }) => {
    if (target.id === 'prevBtn') datepicker.changeMonth('dec');
    if (target.id === 'nextBtn') datepicker.changeMonth();
    if (target.dataset.date) datepicker.pickDate(target);
  });
});

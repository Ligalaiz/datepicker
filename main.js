import {
  getDate,
  calcMonth,
  createElem,
  getCurrentMonthArr,
  getPrevOffsetDays,
  getPastOffsetDays,
} from './utils/index.js';
import { templateStr, months, weekDays } from './internals/index.js';

class Datepicker {
  constructor() {
    this.blockYear = document.getElementById('blockYear');
    this.blockWeek = document.getElementById('blockWeek');
    this.blockMonth = document.getElementById('blockMonth');
    this.blockDays = document.getElementById('blockDays');
    this.prevBtn = document.getElementById('prevBtn');
    this.currentDate = new Date();
    this.weekDays = weekDays;
    this.monthDays = null;
    this.months = months;
    this.focus = null;
    this.from = null;
    this.to = null;
  }

  static renderTemplate(parent = 'app') {
    const template = templateStr;
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

    this.blockYear.innerHTML = '';
    createElem('div', 'select-year__item', currentYear, this.blockYear, [
      'value',
      currentYear,
    ]);
  }

  renderMonths() {
    const currentMonth = getDate(this.currentDate).month;

    this.blockMonth.innerHTML = '';
    createElem(
      'div',
      'select-month__item',
      this.months[currentMonth],
      this.blockMonth,
      ['value', this.months[currentMonth]]
    );
  }

  renderWeek() {
    this.blockWeek.innerHTML = '';

    for (let i = 0; i < this.weekDays.length; i += 1) {
      createElem('li', 'line-week__item', this.weekDays[i], this.blockWeek);
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

    for (let i = 0; i < this.monthDays.length; i += 1) {
      const {
        year: currentYear,
        month: currentMonth,
        day: currentDay,
      } = getDate(this.monthDays[i]);

      let className = 'block-days__item';
      let dataAttr =
        this.monthDays[i] < todayDate
          ? ['date', 'disabled']
          : ['date', `${currentYear}-${currentMonth + 1}-${currentDay}`];

      if (
        todayYear === currentYear &&
        todayMonth === currentMonth &&
        todayDay === currentDay
      ) {
        className = 'block-days__item block-days__item--today';
        dataAttr = ['date', `${currentYear}-${currentMonth + 1}-${currentDay}`];
      }

      const liElem = createElem(
        'li',
        className,
        createElem('span', 'block-days__text', `${currentDay}`),
        this.blockDays,
        dataAttr
      );

      liElem.addEventListener('mouseenter', ({ target }) => {
        const dateItem = target.closest('[data-date]');
        if (
          dateItem &&
          this.from &&
          Date.parse(this.from) < Date.parse(dateItem.dataset.date) &&
          !this.to
        ) {
          const daysNode = document.querySelectorAll('[data-date]');
          daysNode.forEach((item) => {
            item.classList.remove('focus');
            item.classList.remove('range');
          });
          target.classList.add('focus');
          this.focus = dateItem.dataset.date;

          daysNode.forEach((item) => {
            const {
              dataset: { date },
            } = item;

            if (
              Date.parse(date) > Date.parse(this.from) &&
              Date.parse(date) < Date.parse(this.focus)
            )
              item.classList.add('range');
          });
        }
      });
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
    const daysNode = document.querySelectorAll('[data-date]');
    const {
      dataset: { date: pickedDate },
    } = target.closest('.block-days__item');

    if (pickedDate !== 'disabled') {
      if (!this.from) {
        daysNode.forEach((item) => {
          item.classList.remove('range');
        });
        this.from = pickedDate;
        target
          .closest('.block-days__item')
          .classList.add('block-days__item--from');
      } else if (Date.parse(pickedDate) > Date.parse(this.from) && !this.to) {
        this.to = pickedDate;
        target
          .closest('.block-days__item')
          .classList.add('block-days__item--to');
        daysNode.forEach((item) => {
          const {
            dataset: { date },
          } = item;

          if (
            Date.parse(date) > Date.parse(this.from) &&
            Date.parse(date) < Date.parse(this.to)
          )
            item.classList.add('range');
        });
      }
    }
  }
}

window.addEventListener('load', () => {
  Datepicker.renderTemplate();
  const datepicker = new Datepicker();
  datepicker.render();

  document.addEventListener('click', ({ target }) => {
    if (target.id === 'prevBtn') datepicker.changeMonth('dec');
    if (target.id === 'nextBtn') datepicker.changeMonth();
    if (target.closest('[data-date]')) datepicker.pickDate(target);
  });
});

const renderTemplate = () => {
  const template = `
  <div class="wrap">
    <input class="field" type="text" />
    <div class="date-picker">
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

  if (!!this.app) this.app.innerHTML = template;
}

class Datepicker {
  constructor(startYear, endYear) {
    this.startYear = startYear;
    this.endYear = endYear;
    this.app = document.getElementById('app');
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
    this.days = 30;
  }



  getYear(date) {
    return parseInt(date.slice(0, 4));
  }

  renderYear() {
    for (
      let i = this.getYear(this.startYear);
      i <= this.getYear(this.endYear);
      i += 1
    ) {
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
    for (let i = 0; i < this.weekDays.length - 1; i += 1) {
      const weekItem = document.createElement('li');

      weekItem.textContent = this.weekDays[i];
      weekItem.className = 'line-week__item';

      if (!!this.lineWeek) {
        this.lineWeek.insertAdjacentElement('beforeend', weekItem);
      }
    }
  }
  renderDays() {
    let daysRow = document.createElement('ul');
    daysRow.className = 'block-days__row';

    for (let i = 1; i <= this.days; i += 1) {
      const daysItem = document.createElement('li');

      daysItem.textContent = i;
      daysItem.className = 'block-days__item';

      daysRow.appendChild(daysItem);

      if ((i > 1 && i % 7 === 0) || this.days === i) {
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
  renderTemplate();
  const datepicker = new Datepicker('2022-12-08', '2024-12-08');
  datepicker.render();
});

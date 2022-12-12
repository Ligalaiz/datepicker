const templateStr = `
    <div class="wrap" id="wrap">
      <div class="date-picker">
        <input class="field" type="text" name="date" />
        <div class="date-picker__head">
          <button class="date-picker__prev" id="prevBtn"></button>
          <div class="date-picker__date">
            <div class="date-picker__month-date date-month" id="blockMonth">
            </div>
            <div class="date-picker__year-date date-year" id="blockYear">
            </div>
          </div>
          <button class="date-picker__next" id="nextBtn"></button>
        </div>
        <div class="date-picker__body">
          <ul class="date-picker__week-line line-week" id="blockWeek">
          </ul>
          <ul class="date-picker__days-block block-days" id="blockDays">
          </ul>
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

export { templateStr };

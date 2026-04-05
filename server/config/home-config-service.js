const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth();

const prevMonthDate = new Date(currentYear, currentMonth - 1, 1);
const prevMonthYear = prevMonthDate.getFullYear();
const prevMonth = prevMonthDate.getMonth();

const firstDayOfPrevMonth = new Date(prevMonthYear, prevMonth, 1)
  .toISOString()
  .slice(0, 10);

const lastDayOfPrevMonth = new Date(prevMonthYear, prevMonth + 1, 0)
  .toISOString()
  .slice(0, 10);

const lastYear = currentYear - 1;
const firstDayOfLastYear = `${lastYear}-01-01`;
const lastDayOfLastYear = `${lastYear}-12-31`;

const today = now.toISOString().slice(0, 10);

export const homeConfigDates = {
  firstDayOfPrevMonth,
  lastDayOfPrevMonth,
  firstDayOfLastYear,
  lastDayOfLastYear,
  today,
};

const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth();

const prevMonthDate = new Date(currentYear, currentMonth - 1, 1);
const prevMonthYear = prevMonthDate.getFullYear();
const prevMonth = prevMonthDate.getMonth();

export const firstDayOfPrevMonth = new Date(prevMonthYear, prevMonth, 1)
  .toISOString()
  .slice(0, 10);

export const lastDayOfPrevMonth = new Date(prevMonthYear, prevMonth + 1, 0)
  .toISOString()
  .slice(0, 10);

const lastYear = currentYear - 1;
export const firstDayOfLastYear = `${lastYear}-01-01`;
export const lastDayOfLastYear = `${lastYear}-12-31`;

export const today = now.toISOString().slice(0, 10);

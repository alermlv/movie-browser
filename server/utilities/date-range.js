const now = new Date();

export const today = toISO(now);

export const firstDayOfPrevMonth = toISO(
  new Date(now.getFullYear(), now.getMonth() - 1, 1),
);

export const lastDayOfPrevMonth = toISO(
  new Date(now.getFullYear(), now.getMonth(), 0),
);

export const firstDayOfLastYear = `${now.getFullYear() - 1}-01-01`;
export const lastDayOfLastYear = `${now.getFullYear() - 1}-12-31`;

function toISO(date) {
  return date.toISOString().slice(0, 10);
}

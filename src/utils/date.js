import moment from "moment";

export const getDaysArray = (year = moment().year(), month) => {
  const monthIndex = month ? month - 1 : moment().month();
  let date = moment().year(year).month(monthIndex).date(1);
  const result = [];

  let minusDate = date.day() === 0 ? 6 : date.day() - 1;

  for (let i = 1; i <= minusDate; i++) {
    result.push({
      isSameMonth: false,
      formatDate: date.clone().subtract(minusDate + 1 - i, "d"),
    });
  }

  while (date.get("month") === monthIndex) {
    result.push({
      isSameMonth: true,
      formatDate: date.clone(),
    });
    date.add(1, "d");
  }

  let plusDate = 7 - (result.length % 7);
  if (plusDate < 7) {
    for (let i = 1; i <= plusDate; i++) {
      result.push({
        isSameMonth: false,
        formatDate: date.clone(),
      });
      date.add(1, "d");
    }
  }
  return result;
};

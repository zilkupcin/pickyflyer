export const getDayOfTheWeek = date => {
  let newDate = new Date();
  let splitDate = date.split("-");
  newDate.setDate(splitDate[0]);
  newDate.setMonth(parseInt(splitDate[1]) - 1);
  newDate.setFullYear(splitDate[2]);
  return newDate.getDay();
};

export const formatDate = date => {
  let month = date.getMonth() + 1;
  let day = date.getDate();
  month = month.toString();
  month = month.length > 1 ? month : `0${month}`;
  day = day.toString();
  day = day.length > 1 ? day : `0${day}`;
  return `${day}-${month}-${date.getFullYear()}`;
};

export const getReverseDate = date => {
  if (!date) {
    date = formatDate(new Date());
  }
  let splitDate = date.split("-");
  return `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`;
};

export const getDefaultDepartureDate = () => {
  let date = new Date();
  date.setDate(date.getDate() + 7);
  return date;
};

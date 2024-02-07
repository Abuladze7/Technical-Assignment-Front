export const formattedDate = (date: string) => {
  let newDate = new Date(date);
  let day = newDate.getDay();
  let month = newDate.getMonth();
  let year = newDate.getFullYear();

  return `${day < 10 ? `0${day}` : day}.${
    month < 10 ? `0${month}` : month
  }.${year}`;
};

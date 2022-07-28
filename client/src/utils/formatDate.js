export const formatDate = (dateData) => {
  const rawDate = new Date(dateData);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const year = rawDate.getFullYear();
  const monthIndex = rawDate.getMonth();
  const month = months[monthIndex];
  const date = rawDate.getDate();

  return `${date}.${month}.${year}`;
};

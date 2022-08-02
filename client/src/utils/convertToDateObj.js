export const convertIsoStringToDateObj = (isoString) => {
  const DateObj = new Date(isoString.slice(0, -1));
  return DateObj;
};

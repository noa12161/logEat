export const changeToStringFormat = (date) => {
  // "2022. 4. 12." 형식으로 변환
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dateString = year + ". " + month + ". " + day + ".";
  return dateString;
};

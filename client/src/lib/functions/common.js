// 소수 첫번째 자리까지 표시해주는 함수
export const convertToFixedNum = (num) => {
  return Number(num.toFixed(1));
};
// 용량단위 확인 함수
export const checkUnit = (unit, servSizeWeight) => {
  return unit === servSizeWeight;
};
export const changeToStringFormat = (date) => {
  // "2022. 4. 12." 형식으로 변환
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dateString = year + '. ' + month + '. ' + day + '.';
  return dateString;
};
// "2022. 4. 22." => "20220422" 형식으로 바꿔주는 함수
export const formatDateString = (dateString) => {
  const splitDate = dateString.split('.');
  const eraseBlank = splitDate.map((d) =>
    d.includes(' ') ? d.split(' ')[1] : d,
  );
  const result =
    eraseBlank[0] +
    (eraseBlank[1] <= 9 ? `0${eraseBlank[1]}` : eraseBlank[1]) +
    (eraseBlank[2] <= 9 ? `0${eraseBlank[2]}` : eraseBlank[2]);
  return result;
};

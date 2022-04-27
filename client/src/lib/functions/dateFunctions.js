import axios from 'axios';

//해당 month 에 몇일있나 확인 하는 함수
export const configDaysinMonth = (date) => {
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const daysInMonth = new Date(year, month, 0).getDate();
  return daysInMonth;
};

// 용량단위 확인 함수
const checkUnit = (unit, servSizeWeight) => {
  return unit === servSizeWeight;
};

const convertToFixedNum = (num) => {
  return parseInt(num);
};

// 전달받은 days만큼 요청해서 응답값을 배열에 push 한다음 배열을 return 하는 함수
export const getArrayOfMonthCaloriesIntake = async (form) => {
  const ArrayOfMonthCaloriesIntake = [];
  for (let i = 1; i <= form.daysInMonth; i++) {
    const year = form.fullDate.getFullYear();
    const month = form.fullDate.getMonth() + 1;
    const date = i;
    let cal = 0;
    const dateString = year + '. ' + month + '. ' + date + '.';
    // console.log(dateString);
    const res = await axios.post('/api/food/getByDate', {
      username: form.user.username,
      date: dateString,
    });
    const foodList =
      res.data.length > 0 ? res.data[0].foodData[0].meals : 'no data';

    //해당 날짜에 추가된 음식이 없을시...
    if (foodList === 'no data') {
      ArrayOfMonthCaloriesIntake.push({
        fullDate: dateString,
        date: i,
        cal: form.user.currentTargetCalories,
      });
      continue;
    }

    //해당 날짜에 추가된 음식이 있을시...
    foodList.forEach((f) => {
      const isServ = checkUnit(f.unit, f.servSizeWeight);
      // 1회제공량일경우....
      if (isServ) {
        cal = cal + f.oneServCal * f.qtt;
      } else {
        //1g당 일경우...
        cal = cal + (f.oneServCal / f.servSizeWeight) * f.qtt;
      }
    });
    ArrayOfMonthCaloriesIntake.push({
      fullDate: dateString,
      date: i,
      cal: convertToFixedNum(cal),
    });
  }
  return ArrayOfMonthCaloriesIntake;
};

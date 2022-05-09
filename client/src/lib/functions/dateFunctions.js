import { calculateCal } from './calculate';

//해당 month 에 몇일있나 확인 하는 함수
export const configDaysinMonth = (date) => {
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const daysInMonth = new Date(year, month, 0).getDate();
  return daysInMonth;
};

// 전달받은 날짜의 해당 월, 해당 월 일일 열량 반환
export const getArrayOfMonthCaloriesIntake = async (user, startDate) => {
  const monthCalIntake = [];
  const splited = startDate.toLocaleDateString().split('.');
  const month = parseInt(splited[1]);
  const strMonth = '' + month;
  const yearMonth = splited[0] + '.' + splited[1] + '.';
  const daysInMonth = configDaysinMonth(startDate);

  for (let i = 1; i <= daysInMonth; i++) {
    const day = ` ${i}.`;
    const fullDate = yearMonth + day;
    // 해당 날짜의 음식리스트
    const data = user.foodData.find((food) => food.date === fullDate);
    // 해당 날짜에 먹은 음식이 없다면
    if (data === undefined) {
      monthCalIntake.push({ cal: user.currentTargetCalories, date: i });
      continue;
    }
    const sumCal = data.meals.reduce((prv, cur) => prv + calculateCal(cur), 0);
    monthCalIntake.push({ cal: sumCal, date: i });
  }
  console.log(monthCalIntake);
  return { monthCalIntake, strMonth };
};

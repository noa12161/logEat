const DEFAULTCAL = 2000;
const user = {
  foodData: [
    {
      date: '2022. 4. 21.',
      meals: [
        {
          cal: 50,
        },
        {
          cal: 100,
        },
      ],
    },
    {
      date: '2022. 4. 23.',
      meals: [
        {
          cal: 150,
        },
        {
          cal: 200,
        },
      ],
    },
    {
      date: '2022. 4. 30.',
      meals: [
        {
          cal: 550,
        },
        {
          cal: 100,
        },
      ],
    },
  ],
};

/*
  참조하는 값들:
    user, startDate
*/

/*
  순서도
  1. 날짜선택
  2. 해당 월 구하기
  3. 해당 월 일수 구하기 (재사용)
  4. 선택날짜 "year. month." 형식까지 구하기
  5. 빈 배열 만들고
  6. 3번값 만큼 1부터 for문 돌기
  7. 4반값에 day: i 더해서 user.user.foodData.find()
  8. 빈배열에 find 유무에 따라 데이터({date, cal}) push
  9. dispatch(setMonthlyCal({currentMonth, 음식배열}))
*/

/*
구해야하는 것들: {
  선택날짜의 월:
  일일열량배열: [
    {
      date,
      cal
    }
  ]
}
*/
const data = {};

const selectedDay = '2022. 4. 16.';
const daysInMonth = 30;

// 선택날짜 월 구하기
const splited = selectedDay.split('.');
const month = parseInt(splited[1]);
const strMonth = '' + month;
data.selectedMonth = strMonth;
const yearMonth = splited[0] + '.' + splited[1] + '.';

const monthCalIntake = [];
for (let i = 1; i <= daysInMonth; i++) {
  const day = ` ${i}.`;
  const fullDate = yearMonth + day;
  const data = user.foodData.find((food) => food.date === fullDate);
  if (data === undefined) {
    monthCalIntake.push({ cal: DEFAULTCAL, date: i });
    continue;
  }
  const sumCal = data.meals.reduce((prv, cur) => prv + cur.cal, 0);
  monthCalIntake.push({ cal: sumCal, date: i });
  // const oneDayFoods = user.foodData.find()
}
data.data = monthCalIntake;
// console.log(data);

const arr = [1, 2, 3, 4, 5];

const addTwo = (num) => {
  return num + 2;
};

const sumOfArr = arr.reduce((prv, cur) => prv + addTwo(cur), 0);
console.log(sumOfArr);

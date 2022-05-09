import { convertToFixedNum, checkUnit } from './common';

// 기존 음식데이터의 객체배열을 용량단위, 용량을 기준으로 총 열량,탄수,단백,지방 계산...(객체배열 반환)
export const getSumOfNutrition = (foodList) => {
  const sumOfNutrition = foodList.map((f) => {
    const isServ = checkUnit(f.unit, f.servSizeWeight);
    if (isServ) {
      return {
        id: f.id,
        foodName: f.foodName,
        unit: f.unit,
        qtt: f.qtt,
        servSizeWeight: f.servSizeWeight,
        cal: convertToFixedNum(f.oneServCal * f.qtt),
        carb: convertToFixedNum(f.oneServCarb * f.qtt),
        protein: convertToFixedNum(f.oneServProtein * f.qtt),
        fat: convertToFixedNum(f.oneServFat * f.qtt),
      };
    } else {
      return {
        id: f.id,
        foodName: f.foodName,
        unit: f.unit,
        qtt: f.qtt,
        servSizeWeight: f.servSizeWeight,
        cal: convertToFixedNum((f.oneServCal / f.servSizeWeight) * f.qtt),
        carb: convertToFixedNum((f.oneServCarb / f.servSizeWeight) * f.qtt),
        protein: convertToFixedNum(
          (f.oneServProtein / f.servSizeWeight) * f.qtt,
        ),
        fat: convertToFixedNum((f.oneServFat / f.servSizeWeight) * f.qtt),
      };
    }
  });

  return sumOfNutrition;
};

export const getTotalNutrition = (calculatedNutrition) => {
  return {
    cal: convertToFixedNum(
      calculatedNutrition.reduce((pre, cur) => pre + cur.cal, 0),
    ),
    carb: convertToFixedNum(
      calculatedNutrition.reduce((pre, cur) => pre + cur.carb, 0),
    ),
    protein: convertToFixedNum(
      calculatedNutrition.reduce((pre, cur) => pre + cur.protein, 0),
    ),
    fat: convertToFixedNum(
      calculatedNutrition.reduce((pre, cur) => pre + cur.fat, 0),
    ),
  };
};

export const calculateCal = (meal) => {
  const isServ = checkUnit(meal.unit, meal.servSizeWeight);
  if (isServ) {
    return convertToFixedNum(meal.oneServCal * meal.qtt);
  }
  return convertToFixedNum((meal.oneServCal / meal.servSizeWeight) * meal.qtt);
};

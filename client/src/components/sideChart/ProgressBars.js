import React from 'react';
import CalProgress from './CalProgress';
import CarbProgress from './CarbProgress';
import ProteinProgress from './ProteinProgress';
import FatProgress from './FatProgress';

const ProgressBars = ({ user, totalNutrion, nutrition }) => {
  const nutritionRatio = {
    carb: 5,
    protein: 3,
    fat: 2,
  };
  // Progress Bar width % 구하는 함수
  const getProgress = (current, target) => {
    return (current / target) * 100 > 100 ? 100 : (current / target) * 100;
  };
  return (
    <>
      <CalProgress
        targetCal={user.currentTargetCalories}
        nutrition={nutrition}
        getProgress={getProgress}
        totalCal={totalNutrion.cal}
      />
      <CarbProgress
        targetCal={user.currentTargetCalories}
        targetRatioCarb={nutritionRatio.carb}
        getProgress={getProgress}
        nutrition={nutrition}
        totalCarb={totalNutrion.carb}
      />
      <ProteinProgress
        targetCal={user.currentTargetCalories}
        targetRatioProtein={nutritionRatio.protein}
        getProgress={getProgress}
        nutrition={nutrition}
        totalProtein={totalNutrion.protein}
      />
      <FatProgress
        targetCal={user.currentTargetCalories}
        targetRatioFat={nutritionRatio.fat}
        getProgress={getProgress}
        nutrition={nutrition}
        totalFat={totalNutrion.fat}
      />
    </>
  );
};

export default ProgressBars;

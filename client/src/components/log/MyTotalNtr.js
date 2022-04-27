const MyTotalNtr = ({ currentDateTotalNutrition }) => {
  return (
    <div className="log_contents_down_myList_totalNutrition jcac">
      <div>
        <span>열량</span>
        <span>
          <strong>
            {currentDateTotalNutrition ? currentDateTotalNutrition.cal : 0}
          </strong>
        </span>
      </div>
      <div>
        <span>탄수화물</span>
        <span>
          {currentDateTotalNutrition ? currentDateTotalNutrition.carb : 0}
        </span>
      </div>
      <div>
        <span>단백질</span>
        <span>
          {currentDateTotalNutrition ? currentDateTotalNutrition.protein : 0}
        </span>
      </div>
      <div>
        <span>지방</span>
        <span>
          {currentDateTotalNutrition ? currentDateTotalNutrition.fat : 0}
        </span>
      </div>
    </div>
  );
};

export default MyTotalNtr;

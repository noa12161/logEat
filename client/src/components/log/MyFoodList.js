import MyFoodItem from './MyFoodItem';

const MyFoodList = ({ calculatedNutrition, handleDeleteFood }) => {
  return (
    <ul className="log_contents_down_myList_foodLists">
      {calculatedNutrition &&
        calculatedNutrition.map((f, i) => (
          <MyFoodItem key={i} i={i} f={f} handleDeleteFood={handleDeleteFood} />
        ))}
    </ul>
  );
};

export default MyFoodList;

import { Add } from '@material-ui/icons';
import MyTotalNtr from './MyTotalNtr';

const AddAndTotal = ({ currentDateTotalNutrition, onClickSearchBtn }) => {
  return (
    <div className="log_contents_down_myList_addandTotal">
      <div
        onClick={onClickSearchBtn}
        className="log_contents_down_myList_add jcac"
      >
        <Add style={{ fill: '#068b2e' }} />
        <span style={{ color: '#068b2e' }}>추가하기</span>
      </div>
      {/* 먹은 음식 영양성분 총합 */}
      <MyTotalNtr currentDateTotalNutrition={currentDateTotalNutrition} />
    </div>
  );
};

export default AddAndTotal;

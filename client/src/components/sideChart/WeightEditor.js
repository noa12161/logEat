import './sideChart.css';
import { Close } from '@material-ui/icons';
import { forwardRef, useState, useRef } from 'react';
// 리덕스
import { useDispatch } from 'react-redux';
import { setSideChartEditor } from '../../redux/buttons/buttonSlice';
// datepicker
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';

const WeightEditor = ({
  userWeight,
  handleUserStateValue,
  handleWeightChange,
}) => {
  const dispatch = useDispatch();
  //date picker
  const dateRef = useRef();
  const [startDate, setStartDate] = useState(new Date());
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      className="example-custom-input sideChart_datepicker"
      onClick={onClick}
      ref={ref}
    >
      {value}
    </button>
  ));

  return (
    <div className="edditor">
      <div className="edditor_contents_container">
        <div className="editor_contents">
          <button
            className="editor_button"
            onClick={() => dispatch(setSideChartEditor('weightEditor'))}
          >
            <Close />
          </button>
          <span>날짜 선택</span>
          <div className="datepicker_container">
            <DatePicker
              locale={ko} // 한글로 변경
              dateFormat="yyyy/MM/dd"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              customInput={<ExampleCustomInput ref={dateRef} />}
            />
          </div>
          <span>변화된 체중!!!</span>
          <form>
            <div className="editor_input_container">
              <input
                name="weight"
                value={userWeight}
                onChange={handleUserStateValue}
                type="number"
              />
              kg
            </div>
            <button
              onClick={(e) => handleWeightChange(e, userWeight, startDate)}
            >
              확인
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WeightEditor;

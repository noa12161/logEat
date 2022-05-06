import './sideChart.css';
import { setSideChartEditor } from '../../redux/buttons/buttonSlice';
import { useDispatch } from 'react-redux';

import { Close } from '@material-ui/icons';

const CalEditor = ({
  targetCalorie,
  handleUserStateValue,
  handleTargetCalChange,
}) => {
  const dispatch = useDispatch();

  return (
    <div className="edditor">
      <div className="edditor_contents_container">
        <div className="editor_contents">
          <button
            className="editor_button"
            onClick={() => dispatch(setSideChartEditor('calEditor'))}
          >
            <Close />
          </button>
          <span>목표 칼로리</span>
          <form>
            <input
              name="calories"
              value={targetCalorie}
              onChange={handleUserStateValue}
              type="number"
            />
            <button onClick={(e) => handleTargetCalChange(e, targetCalorie)}>
              확인
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CalEditor;

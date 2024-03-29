import { DeleteOutline } from '@material-ui/icons';

const MyFoodItem = ({ f, handleDeleteFood }) => {
  return (
    <li className="log_contents_down_myList_foodList">
      <div className="log_contents_down_myList_foodList_left">
        <div className="log_contents_down_myList_foodList_left_name jcac">
          <div className="delete_icon_container">
            <DeleteOutline
              onClick={() => handleDeleteFood(f)}
              style={{
                width: '1rem',
                cursor: 'pointer',
                fill: '#e43434',
              }}
            />
          </div>
          <div className="log_contents_down_myList_foodList_left_name_Name">
            {f.foodName}
          </div>
        </div>
        <div className="log_contents_down_myList_foodList_left_quantity jcac">
          {f.unit === f.servSizeWeight ? (
            <div>
              <div>{(f.unit / f.servSizeWeight) * f.qtt} serv</div>
              <div>{f.unit * f.qtt} g</div>
            </div>
          ) : (
            f.unit * f.qtt + 'g'
          )}
        </div>
      </div>
      <div className="log_contents_down_myList_foodList_right">
        <div>{f.cal}</div>
        <div>{f.carb}</div>
        <div>{f.protein}</div>
        <div>{f.fat}</div>
      </div>
    </li>
  );
};

export default MyFoodItem;

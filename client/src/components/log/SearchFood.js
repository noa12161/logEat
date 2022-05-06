import './log.css';
import { Close, Search } from '@material-ui/icons';

const SearchFood = ({
  nameOfFood,
  setNameOfFood,
  handleSearchButton,
  currentPosts,
  onClickCloseBtn,
}) => {
  return (
    <form className="log_contents_down_food_search">
      <input
        value={nameOfFood}
        type="text"
        placeholder="음식검색..."
        className="jcac"
        onChange={(e) => setNameOfFood(e.target.value)}
      />
      <button className="jcac" onClick={handleSearchButton}>
        <Search />
      </button>
      <Close
        style={{
          position: 'absolute',
          top: '10px',
          right: currentPosts.length > 0 ? '10px' : '-29px',
          cursor: 'pointer',
        }}
        onClick={onClickCloseBtn}
      />
    </form>
  );
};

export default SearchFood;

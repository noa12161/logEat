import '../../components/log/log.css';
import { useState, useEffect, useMemo } from 'react';
import { addFoodToDbApi } from '../../lib/api/food';
import CircularProgress from '@mui/material/CircularProgress';

// 리덕스
import { useDispatch } from 'react-redux';
import { setShowSearchFood } from '../../redux/buttons/buttonSlice';
import { clearSearchedFood, searchFood } from '../../redux/foods/foodSlice';
import { applyUser } from '../../redux/user/userSlice';

// 컴포넌트
import SearchFood from '../../components/log/SearchFood';
import SearchedFoodList from '../../components/log/SearchedFoodList';

const FoodSearchContainer = ({ searchedFood, user, date }) => {
  const dispatch = useDispatch();
  const [nameOfFood, setNameOfFood] = useState('');
  const [localSearchedFood, setLocalSearchedFood] = useState([]);

  useEffect(() => {
    if (searchedFood.data === null) {
      return setLocalSearchedFood([]);
    }
    setLocalSearchedFood([...searchedFood.data]);
  }, [searchedFood.data]);

  //FOR PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastPost = useMemo(
    () => currentPage * itemsPerPage,
    [currentPage],
  );
  const indexOfFirstPost = useMemo(
    () => indexOfLastPost - itemsPerPage,
    [indexOfLastPost],
  );
  const currentPosts = useMemo(
    () => localSearchedFood.slice(indexOfFirstPost, indexOfLastPost),
    [indexOfFirstPost, indexOfLastPost, localSearchedFood],
  );
  const paginate = (number) => {
    setCurrentPage(number);
  };

  // 음식 검색 버튼 핸들러
  const handleSearchButton = async (e) => {
    e.preventDefault();
    if (nameOfFood === '') return;
    setCurrentPage(1);
    dispatch(searchFood(nameOfFood));
    setNameOfFood('');
  };

  const onClickCloseBtn = () => {
    setNameOfFood('');
    dispatch(setShowSearchFood(false));
    dispatch(clearSearchedFood());
  };
  // cleanup
  useEffect(() => {
    return () => {
      dispatch(clearSearchedFood());
    };
  }, []);

  // 검색한 음식 DB에 추가하는 함수
  const handleAddToDb = async (mealObj) => {
    if (!user) return alert('로그인이 필요합니다.');
    if (mealObj.qtt === '' || mealObj.qtt === 0)
      return alert('용량을 선택해주세요...');
    const objForRequest = {
      username: user.username,
      date,
      mealObj,
    };
    const res = await addFoodToDbApi(objForRequest);
    localStorage.setItem('user', JSON.stringify(res.data));
    dispatch(applyUser(res.data));
  };

  // 음식 용량 핸들러
  const handleFoodQtt = (e, foodId) => {
    if (isNaN(e.target.value)) return alert('숫자를 입력해주세요...');
    const updated = localSearchedFood.map((food) =>
      food.id === foodId
        ? { ...food, qtt: e.target.value === '' ? '' : Number(e.target.value) }
        : food,
    );
    setLocalSearchedFood(updated);
  };
  // 음식 용량 단위( 1serv or g) 핸들러
  const handleFoodUnit = (e, foodId, oneServingWeight) => {
    let selectUnit = e.target.value;
    if (selectUnit === 'g') {
      selectUnit = 1;
    } else {
      selectUnit = oneServingWeight;
    }
    const updated = localSearchedFood.map((food) =>
      food.id === foodId ? { ...food, unit: selectUnit } : food,
    );
    setLocalSearchedFood(updated);
  };

  return (
    <div className="log_contents_down_food_search_container">
      <SearchFood
        nameOfFood={nameOfFood}
        setNameOfFood={setNameOfFood}
        handleSearchButton={handleSearchButton}
        currentPosts={currentPosts}
        onClickCloseBtn={onClickCloseBtn}
      />
      {/* 데이터가 있고 ... 로딩중이 아니라면 */}
      {currentPosts.length > 0 && !searchedFood.isLoading ? (
        <SearchedFoodList
          currentPosts={currentPosts}
          handleAddToDb={handleAddToDb}
          handleFoodQtt={handleFoodQtt}
          handleFoodUnit={handleFoodUnit}
          localSearchedFood={localSearchedFood}
          itemsPerPage={itemsPerPage}
          paginate={paginate}
          currentPage={currentPage}
        />
      ) : !searchedFood.isLoading ? (
        <div></div>
      ) : (
        <div className="jcac">
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default FoodSearchContainer;

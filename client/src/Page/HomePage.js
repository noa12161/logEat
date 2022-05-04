import './page.css';
import SideBar from '../components/sidebar/SideBar';
import Header from '../components/header/Header';
import LogContainer from '../container/LogContainer';
import ChartContainer from '../container/ChartContainer';
import SideChartCont from '../container/sideChart/SideChartCont';
import NotFound from './NotFound';

import { Routes, Route } from 'react-router-dom';
// 리덕스...
import { useSelector } from 'react-redux';
import PostPage from './posts/PostPage';

const HomePage = () => {
  const {
    user,
    date,
    foodList,
    currentDateNutrition,
    sideChartEdditorHandler,
  } = useSelector(({ user, food, buttons }) => {
    return {
      user: user.user,
      date: user.date,
      foodList: food.foodList,
      currentDateNutrition: food.currentDateNutrition,
      sideChartEdditorHandler: buttons.sideChartEdditorHandler,
    };
  });


  return (
    <div className="HomePage">
      <SideBar />
      <div className="ContentsContainer">
        <Header user={user} />
        <Routes>
          {/* 주요 기능 실행 컴포넌트...(음식 검색, 음식 기록 등등...) */}
          <Route
            index
            element={
              <LogContainer
                user={user}
                date={date}
                foodList={foodList}
                calculatedNutrition2={currentDateNutrition.calculatedNutrition}
                totalNutrition2={currentDateNutrition.totalNutrition}
              />
            }
          />
          <Route path="chart" element={<ChartContainer user={user} />} />
          <Route path="posts/*" element={<PostPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {user && (
        <SideChartCont
          user={user}
          nutrition={currentDateNutrition.totalNutrition}
          sideChartEdditorHandler={sideChartEdditorHandler}
        />
      )}
    </div>
  );
};

export default HomePage;

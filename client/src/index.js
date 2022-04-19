import ReactDOM from 'react-dom';

import './index.css';
import App from './App.js';
import { BrowserRouter } from 'react-router-dom';
// 리덕스
import { store } from './redux/store.js';
import { Provider } from 'react-redux';
import { login } from './redux/user/userSlice';

//로그인 후 페이지 새로고침 해도 로그인 유지하게 해주는 fn()
const loaderUser = async () => {
  try {
    const user = localStorage.getItem('user');
    if (!user) return; // 로그인 상태가 아니라면 아무것도 안 함

    // const token = JSON.parse(user).accessToken;
    // const res = await axios.post('/api/auth/check', token);
    // console.log(res);

    store.dispatch(login(JSON.parse(user))); //redux.user.user 를 설정
  } catch (e) {
    console.log(e);
    console.log('localStorage is not working');
  }
};
loaderUser();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

/*
  TO FIX....
  검색된 음식의 용량을 전부 지우면 0으로 표시되고 다시 숫자를 쓰면 013... 이런식으로 표현됨
  새로고침 하면 로컬스토리지에 있는 업데이트 되지 않은 유저를 리덕스에 적용시킴
  타이핑을 할때마다 rerender 되고있음...
  




*/

/*
  추가할 기능...

*시작 날짜부터 몸무게 변화 갱신 조건*
1. 날짜를 바꿈 && month가 다름
	header에서 처리..
2. 유저가 오늘 몸무게 바꿈
	logContainer에서 처리..
3. 유저가 현재 month 의 몸무게를 바꿈..
	리덕스에 선택 month의 user정보 저장

  // 한달범위 내 하루 열량 섭취량
    1. date picker로 날짜 선택
    2. 해당 날짜의 month 에 day가 몇일까지 있나 확인
    3. 해당 날짜의 month에 있는 모든 daye들의 각날짜별 열량 섭취량 계산후 배열에 1일부터 push
    4. 기록되지 않은 날의 열량은 전날의 열량 기록
    eg) const monthCalIntake = [ {date:1, cal: 2300}, {date: 2, cal:2200}, ...]
    4. 오늘 날짜보다 미래의 열량은 null? 0?
    5. redux에 저장

  // 한달간 몸무게
    1. 사용자는 매일매일 자기 몸무게를 기록함 -> DB에 저장
    2. 사용자가 기록하지 않을시 -> 전날 몸무게로 DB에 저장
    3. date-picker로 정한 날짜의 month의 모든 날짜에대한 사용자 몸무게 배열에 push
    eg) const monthUserWeight = [{date:1, weight:76}, {date:2, weight:75},]
    4. 오늘 날짜보다 미래의 몸무게는 null? 0?
    5. redux에 저장

  // 하루 영양성분
    1. 해당 date에 대한 영양성분 누적계산 후에 redux에 저장..

  //몸무게 한달 변화 그래프...
    1. label : monthCalIntake.map( d => d.date)
    2. datasets: monthCalIntake.map( d => d.cal)

  //한달 열량 그래프...
    1. label : monthCalIntake.map( d => d.date)
    2. datasets: monthCalIntake.map( d => d.weight)
  


  //사이드바...
    하루 열량 목표량...
    하루 탄수 목표량...
    하루 단백질 목표량...
    하루 지방 목표량...
    하루 탄단지 비율...

    // 즐겨찾기 음식 등록

  로그인 -> 서버에서 받은 유저정보를 리덕스+로컬스토리지에 저장
  로그아웃 -> 리덕스 + 로컬스토리지 초기화
  음식등록 -> access 토큰 검증 -> DB에 추가
  음식 삭제 ->  access 토큰 검증 -> DB에서 삭제




*/

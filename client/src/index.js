// V2 TEST !!!!

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

  검색 버튼 누르고 서버에서 요청 받아올때까지 로딩 스피너 구현...
  내 음식 리스트의 용량 수정...

  전체 게시글 보기
  친구 게시글 보기
  내 게시글 보기
  게시글 작성
    // 로그인 필요
    제목
    내용
    사진
    댓글
      댓글
    좋아요
    // 로그인 필요, 내 게시글
  게시글 수정
    // 로그인 필요, 내 게시글
  게시글 삭제

  친구 추가
  친구 삭제


  로그인 -> 서버에서 받은 유저정보를 리덕스+로컬스토리지에 저장
  로그아웃 -> 리덕스 + 로컬스토리지 초기화
  음식등록 -> access 토큰 검증 -> DB에 추가
  음식 삭제 ->  access 토큰 검증 -> DB에서 삭제




*/

/*
  나중에 추가할 기능

  음식 즐겨찾기 기능
  특정 날짜의 음식 데이터를 게시글에 등록할수있는 기능

*/

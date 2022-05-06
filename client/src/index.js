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
    store.dispatch(login(JSON.parse(user))); //redux.user.user 를 설정
  } catch (e) {
    console.log(e);
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

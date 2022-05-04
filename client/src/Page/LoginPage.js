import './page.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../redux/user/userSlice';
import { loginApi } from '../lib/api/auth';

const LoginPage = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username === '' || password === '')
      return alert('사용자 이름과 비밀번호를 입력해주세요..');

    const loginForm = { username, password };

    /*
      응답받은 유저데이터를 디스패치 하게되면
      아래 useEffect에서 user가 디스패치되자마자 '/' 경로로 navigate 하기떄문에
      setUsername, setPassword를 디스패치 이전에 안할시
      router 이동시 메모리 lack 에러
    */
    try {
      console.log('login start');
      const response = await loginApi(loginForm);
      setUsername('');
      setPassword('');
      dispatch(login(response.data));
    } catch (e) {
      if (e.response.data === 'noUser') {
        return alert('존재하지 않는 사용자 이름입니다.');
      } else if (e.response.data === 'wrongPassword') {
        return alert('올바르지 않은 비밀번호입니다');
      } else {
        alert('알수없는 오류입니다.');
      }
      console.log(e.response.data);
    }
  };

  let navigate = useNavigate();
  useEffect(() => {
    if (!user) return;

    try {
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/', { replace: true });
    } catch (e) {
      console.log('error in LoginPage' + e);
    }
  }, [user, navigate]);

  return (
    <div className="LoginPage_wrapper">
      <div className="form_desc">로그인</div>
      <form onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={handleUsername}
          type="text"
          placeholder="사용자 이름..."
        />
        <input
          value={password}
          onChange={handlePassword}
          type="password"
          placeholder="비밀번호..."
        />
        <button>확인</button>
      </form>
    </div>
  );
};

export default LoginPage;

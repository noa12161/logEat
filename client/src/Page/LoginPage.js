import './page.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../redux/user/userSlice';
import { axiosInstance } from '../config';

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
    if (username === '' || password === '') return;

    const loginForm = { username, password };

    /*
      응답받은 유저데이터를 디스패치 하게되면
      아래 useEffect에서 user가 디스패치되자마자 '/' 경로로 navigate 하기떄문에
      setUsername, setPassword를 디스패치 이전에 안할시
      router 이동시 메모리 lack 에러
    */
    try {
      const response = await axiosInstance.post('/auth/login', loginForm);
      setUsername('');
      setPassword('');
      console.log(response);
      dispatch(login(response.data));
    } catch (e) {
      console.log(e);
    }
  };

  const axiosJWT = axios.create();
  const sendHeaders = async () => {
    try {
      await axiosJWT.post('/api/auth/testHeader', user, {
        headers: { authorization: user.accessToken },
      });
    } catch (err) {
      console.log(err);
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
      // navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="LoginPage_wrapper">
      <div className="form_desc">LOGIN</div>
      <form onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={handleUsername}
          type="text"
          placeholder="username..."
        />
        <input
          value={password}
          onChange={handlePassword}
          type="text"
          placeholder="password..."
        />

        <button>확인</button>
      </form>
      <button onClick={() => axios.get('/api/auth')}>쿠키확인</button>
      <button onClick={sendHeaders}>헤더 확인</button>
    </div>
  );
};

export default LoginPage;

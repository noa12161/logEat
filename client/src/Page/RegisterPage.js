import './page.css';
import axios from 'axios';
import { axiosInstance } from '../config';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const { registerSuccess } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [startWeight, setStartWeight] = useState('');
  const [targetCalorie, setTargetCalorie] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username === '' || password === '' || confirmPassword === '') return;

    if (!password === confirmPassword)
      return alert('please enter same password');
    const loginForm = { username, password, startWeight, targetCalorie };

    try {
      const response = await axiosInstance.post('/auth/register', loginForm);
      if (response.status === 200) dispatch(register());
      console.log(response); //response.data 가 실제 payload...
    } catch (e) {
      console.log(e);
    }
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setStartWeight('');
    setTargetCalorie('');
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleStartWeight = (e) => {
    setStartWeight(e.target.value);
  };
  const handleTargetCalories = (e) => {
    setTargetCalorie(e.target.value);
  };

  let navigate = useNavigate();

  useEffect(() => {
    if (!registerSuccess) return;
    console.log(registerSuccess);
    navigate('/', { replace: true });
  }, [registerSuccess, navigate]);
  return (
    <div className="LoginPage_wrapper">
      <div className="form_desc">REGISTER</div>
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
        <input
          value={confirmPassword}
          onChange={handleConfirmPassword}
          type="text"
          placeholder="confirm password..."
        />
        <input
          value={startWeight}
          onChange={handleStartWeight}
          type="text"
          placeholder="시작 몸무게..."
        />
        <input
          value={targetCalorie}
          onChange={handleTargetCalories}
          type="text"
          placeholder="목표 칼로리..."
        />
        <button>확인</button>
      </form>
    </div>
  );
};

export default RegisterPage;

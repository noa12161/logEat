import './page.css';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { registerSuccess, registerInit } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { registerApi } from '../lib/api/auth';

const RegisterPage = () => {
  const { register } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
    startWeight: '',
    targetCalorie: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');

  // 회원가입 제출 함수
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      registerForm.username === '' ||
      registerForm.password === '' ||
      confirmPassword === ''
    )
      return;

    if (registerForm.password !== confirmPassword)
      return alert('비밀번호가 다릅니다..');

    try {
      const response = await registerApi(registerForm);
      if (response.status === 200) dispatch(registerSuccess());
    } catch (e) {
      console.log(e);
    }
    setRegisterForm({
      username: '',
      password: '',
      startWeight: '',
      targetCalorie: '',
    });
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleInput = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  // 회원가입 성공시 홈페이지로 이동
  let navigate = useNavigate();
  useEffect(() => {
    if (!register.status) return;
    console.log(register.status);
    dispatch(registerInit());
    navigate('/', { replace: true });
  }, [register, navigate, dispatch]);

  return (
    <div className="LoginPage_wrapper">
      <div className="form_desc">REGISTER</div>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          value={registerForm.username}
          onChange={(e) => handleInput(e)}
          type="text"
          placeholder="username..."
        />
        <input
          name="password"
          value={registerForm.password}
          onChange={(e) => handleInput(e)}
          type="password"
          placeholder="password..."
        />
        <input
          value={confirmPassword}
          onChange={handleConfirmPassword}
          type="password"
          placeholder="confirm password..."
        />
        <input
          name="startWeight"
          value={registerForm.startWeight}
          onChange={(e) => handleInput(e)}
          type="text"
          placeholder="시작 몸무게..."
        />
        <input
          name="targetCalorie"
          value={registerForm.targetCalorie}
          onChange={(e) => handleInput(e)}
          type="text"
          placeholder="목표 칼로리..."
        />
        <button>확인</button>
      </form>
    </div>
  );
};

export default RegisterPage;

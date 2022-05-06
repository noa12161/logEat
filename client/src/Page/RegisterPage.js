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
      return alert('빈칸을 채워주세요.');

    if (registerForm.password !== confirmPassword)
      return alert('비밀번호가 다릅니다.');

    try {
      const response = await registerApi(registerForm);
      console.log(response);
      if (response.status === 200) dispatch(registerSuccess());
    } catch (e) {
      if (e.response.data === 'existUsername')
        return alert('존재하는 사용자 이름입니다.');
      return alert('알수없는 오류입니다...');
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
    dispatch(registerInit());
    navigate('/', { replace: true });
  }, [register, navigate, dispatch]);

  return (
    <div className="LoginPage_wrapper">
      <div className="form_desc">회원가입</div>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          value={registerForm.username}
          onChange={(e) => handleInput(e)}
          type="text"
          placeholder="사용자 이름..."
        />
        <input
          name="password"
          value={registerForm.password}
          onChange={(e) => handleInput(e)}
          type="password"
          placeholder="비밀번호..."
        />
        <input
          value={confirmPassword}
          onChange={handleConfirmPassword}
          type="password"
          placeholder="비밀번호 확인..."
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

import axios from 'axios';

// 회원가입
export const registerApi = async (registerForm) => {
  return await axios.post('/api/auth/register', registerForm);
};

// 로그인
export const loginApi = async (loginForm) => {
  return await axios.post('/api/auth/login', loginForm);
};

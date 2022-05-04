import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './Page/HomePage';
import LoginPage from './Page/LoginPage';
import RegisterPage from './Page/RegisterPage';
// 리덕스
import { useDispatch } from 'react-redux';
import { setWindowWidth } from './redux/window/windowSlice.js';
import { useEffect } from 'react';

import sanitizeHtml from 'sanitize-html';

function App() {
  const dispatch = useDispatch();
  console.log('app!!!!');

  const html = '<strong>hello world</strong>';
  console.log(sanitizeHtml(html));
  console.log(sanitizeHtml("<img src=x onerror=alert('img') />"));
  console.log(sanitizeHtml("console.log('hello world')"));
  console.log(sanitizeHtml("<script>alert('hello world')</script>"));

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const updateDimensions = () => {
    const width = window.innerWidth;
    dispatch(setWindowWidth(width));
  };

  return (
    <div className="App background">
      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
}

export default App;

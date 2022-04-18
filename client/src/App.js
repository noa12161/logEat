import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './Page/HomePage';
import LoginPage from './Page/LoginPage';
import RegisterPage from './Page/RegisterPage';
import NotFound from './Page/NotFound';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

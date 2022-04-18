import React from 'react';
import Social from '../components/social/Social';
import { Routes, Route } from 'react-router-dom';

const SocialContainer = () => {
  return (
    <div className="SocialContainer">
      <Routes>
        <Route path="/" element={<Social />} />
        <Route path="/:userId" element={<Social />} />
      </Routes>
    </div>
  );
};

export default SocialContainer;

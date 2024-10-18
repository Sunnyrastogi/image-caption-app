import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './Components/SearchPage';
import AddCaptionPage from './Components/AddCaptionPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/add-caption" element={<AddCaptionPage />} />
      </Routes>
    </Router>
  );
};

export default App;

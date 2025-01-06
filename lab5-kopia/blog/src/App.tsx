import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import Blog from './pages/Blog';
import Dodaj from './pages/Dodaj';
import Artykul from './pages/Artykuł';
import './App.css'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="blog" element={<Blog />} />
          <Route path="dodaj" element={<Dodaj />} />
          <Route path="artykul/:id" element={<Artykul />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

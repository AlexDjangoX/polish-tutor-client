import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Hero from './components/hero/Hero';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navbar />} />
        <Route path='/experience' element={<Navbar />} />
        <Route path='/contact' element={<Navbar />} />
        <Route path='*' element={<Navigate replace to='/' />} />
      </Routes>
      <Hero />
    </>
  );
}

export default App;

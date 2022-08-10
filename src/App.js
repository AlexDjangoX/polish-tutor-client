import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navbar />} />
        <Route path='/signup' element={<Navbar />} />
        <Route path='/home' element={<Navbar />} />
        <Route path='*' element={<Navigate replace to='/' />} />
      </Routes>
    </>
  );
}

export default App;

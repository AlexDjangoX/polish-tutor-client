import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Hero from './components/hero/Hero';
import Timeline from './components/timeline/Timeline';
import Kanban from './components/drag&drop/Kanban';

import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Hero />} />
        <Route path='/experience' element={<Timeline />} />
        <Route path='/contact' element={<Timeline />} />
        <Route path='/kanban' element={<Kanban />} />
        <Route path='*' element={<Timeline replace to='/' />} />
      </Routes>
    </>
  );
}

export default App;

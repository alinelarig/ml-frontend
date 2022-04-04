import React from 'react';
import './App.sass';
import Home from './components/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route key="home" exact path="/" element={<Home />} />
        <Route key="detail" exact path="/items/:id" element={<Home />} />
        {/* <Route key="search" exact path="/items" element={<Home />} /> */}
      </Routes>
    </Router>
  );
}

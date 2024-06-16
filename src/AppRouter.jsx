import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/LoginComponents.jsx';
import Register from './components/RegisterComponent.jsx';
import ClicksBySourceChart from './components/Graphs/ClicksBySourceChart.jsx';
import Dashboard from './components/Dashboard.jsx';

const AppRouter = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/link/clicks" element={<ClicksBySourceChart />} />
    </Routes>
  </Router>
  );
};

export default AppRouter;


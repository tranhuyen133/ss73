import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TodolistManagement from './pages/TodolistManagement';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/todoList' element={<TodolistManagement />} />
      </Routes>
    </div>
  );
}

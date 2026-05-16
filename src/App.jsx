import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HabitsListScreen from './screens/HabitsListScreen';
import AddHabitScreen from './screens/AddHabitScreen';

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ maxWidth: 600, margin: '0 auto', minHeight: '100vh', backgroundColor: '#fff', boxShadow: '0 0 10px rgba(0,0,0,0.05)' }}>
        <header style={{ padding: '16px 20px', borderBottom: '1px solid #eee', backgroundColor: '#fff' }}>
          <h1 style={{ margin: 0, fontSize: 20, color: '#222' }}>Трекер привычек</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HabitsListScreen />} />
            <Route path="/add" element={<AddHabitScreen />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

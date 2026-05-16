import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const STORAGE_KEY = '@habits_tracker:habits';

export default function AddHabitScreen() {
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const handleSave = (e) => {
    e?.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      alert('Пожалуйста, введите название привычки.');
      return;
    }

    const raw = localStorage.getItem(STORAGE_KEY);
    const habits = raw ? JSON.parse(raw) : [];
    const newHabit = {
      id: Date.now().toString(),
      title: trimmed,
      done: false,
      createdAt: new Date().toISOString(),
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify([newHabit, ...habits]));
    navigate('/');
  };

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ marginTop: 0, fontSize: 18, color: '#333' }}>Новая привычка</h2>
      
      <form onSubmit={handleSave}>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', fontSize: 14, color: '#555', marginBottom: 8 }}>
            Название привычки
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="например, Пить воду"
            autoFocus
            maxLength={80}
            style={{ 
              width: '100%', 
              padding: '12px 14px', 
              fontSize: 16, 
              border: '1px solid #ddd', 
              borderRadius: 8,
              outline: 'none'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button 
            type="button"
            onClick={() => navigate('/')}
            style={{ 
              flex: 1, 
              padding: '12px', 
              backgroundColor: '#f1f1f1', 
              color: '#333', 
              border: 'none', 
              borderRadius: 8, 
              fontSize: 16, 
              cursor: 'pointer'
            }}
          >
            Отмена
          </button>
          <button 
            type="submit"
            style={{ 
              flex: 1, 
              padding: '12px', 
              backgroundColor: '#007bff', 
              color: '#fff', 
              border: 'none', 
              borderRadius: 8, 
              fontSize: 16, 
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Сохранить
          </button>
        </div>
      </form>
    </div>
  );
}

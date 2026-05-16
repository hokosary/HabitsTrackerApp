import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const STORAGE_KEY = '@habits_tracker:habits';

export default function HabitsListScreen() {
  const [habits, setHabits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setHabits(JSON.parse(raw));
      } catch (e) {
        console.error('Failed to parse habits', e);
      }
    }
  }, []);

  const saveHabits = (next) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setHabits(next);
  };

  const toggleHabit = (id) => {
    const next = habits.map((h) =>
      h.id === id ? { ...h, done: !h.done } : h
    );
    saveHabits(next);
  };

  const deleteHabit = (id) => {
    if (window.confirm('Удалить привычку?')) {
      const next = habits.filter((h) => h.id !== id);
      saveHabits(next);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 60px)' }}>
      <div style={{ flex: 1, padding: 20, overflowY: 'auto' }}>
        {habits.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#666', marginTop: 40 }}>
            <p style={{ fontSize: 18, margin: '0 0 8px' }}>Пока нет привычек.</p>
            <p style={{ fontSize: 14, color: '#999', margin: 0 }}>Нажмите кнопку ниже, чтобы добавить первую привычку.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {habits.map(item => (
              <div 
                key={item.id} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '14px 16px', 
                  backgroundColor: '#fff', 
                  border: '1px solid #eee', 
                  borderRadius: 10,
                  cursor: 'pointer',
                  userSelect: 'none'
                }}
                onClick={() => toggleHabit(item.id)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  deleteHabit(item.id);
                }}
              >
                <div style={{ 
                  width: 24, 
                  height: 24, 
                  borderRadius: 6, 
                  border: `2px solid ${item.done ? '#4caf50' : '#888'}`, 
                  backgroundColor: item.done ? '#4caf50' : 'transparent',
                  marginRight: 12, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: 14
                }}>
                  {item.done && '✓'}
                </div>
                <span style={{ 
                  fontSize: 16, 
                  color: item.done ? '#888' : '#222', 
                  textDecoration: item.done ? 'line-through' : 'none',
                  flex: 1
                }}>
                  {item.title}
                </span>
                <button 
                  onClick={(e) => { e.stopPropagation(); deleteHabit(item.id); }}
                  style={{ background: 'none', border: 'none', color: '#ff5252', cursor: 'pointer', padding: '4px 8px' }}
                  title="Удалить"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ padding: 20, borderTop: '1px solid #eee', backgroundColor: '#fff' }}>
        <button 
          onClick={() => navigate('/add')}
          style={{ 
            width: '100%', 
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
          Добавить привычку
        </button>
      </div>
    </div>
  );
}

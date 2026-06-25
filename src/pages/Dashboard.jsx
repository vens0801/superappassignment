import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import TimerWidget from '../components/TimerWidget';
import NotesWidget from '../components/NotesWidget';
import WeatherWidget from '../components/WeatherWidget';
import NewsWidget from '../components/NewsWidget';

const Dashboard = () => {
  const { user, categories } = useStore();
  const navigate = useNavigate();

  return (
    <div className="app-container fade-in dashboard-layout">
      
      {/* Left Column (Profile, Weather, Timer) */}
      <div className="dashboard-left">
        
        {/* Top Row: Profile & Weather */}
        <div className="dashboard-top-row">
          
          {/* Profile Widget */}
          <div className="widget-panel dashboard-profile" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'var(--accent-purple)' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ width: '6rem', height: '8rem', backgroundColor: '#fff', borderRadius: '0.75rem', backgroundImage: 'url(https://api.dicebear.com/7.x/avataaars/svg?seed=Felix)', backgroundSize: 'cover' }}></div>
              <div style={{ color: '#fff' }}>
                <p style={{ fontSize: '1.125rem', opacity: 0.8 }}>{user.name || "Guest User"}</p>
                <p style={{ fontSize: '1.125rem', opacity: 0.8 }}>{user.email || "No email"}</p>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '0.5rem' }}>{user.username || "User"}</h1>
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem', overflowY: 'auto', maxHeight: '5rem' }}>
              {categories.map(cat => (
                <span key={cat} style={{ backgroundColor: '#9F94FF', color: '#fff', padding: '0.25rem 1rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 600 }}>
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Weather Widget */}
          <div className="dashboard-weather">
            <WeatherWidget />
          </div>
        </div>

        {/* Middle Row: Timer */}
        <div style={{ height: '16rem' }}>
          <TimerWidget />
        </div>
      </div>

      {/* Middle Column (Notes) */}
      <div className="dashboard-middle">
        <NotesWidget />
      </div>

      {/* Right Column (News) */}
      <div className="dashboard-right">
        <NewsWidget />
      </div>

      {/* Browse Movies Button */}
      <button 
        className="btn-primary"
        onClick={() => navigate('/movies')}
        style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 50, boxShadow: '0 4px 15px rgba(0,0,0,0.5)' }}
      >
        Browse
      </button>
    </div>
  );
};

export default Dashboard;
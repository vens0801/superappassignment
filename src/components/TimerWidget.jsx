import React, { useState, useEffect } from 'react';

const TimerWidget = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);

  // Countdown Logic
  useEffect(() => {
    let interval = null;
    if (isActive && totalSeconds > 0) {
      interval = setInterval(() => {
        setTotalSeconds((prev) => {
          const newTotal = prev - 1;
          
          // Calculate and update the display values
          setHours(Math.floor(newTotal / 3600));
          setMinutes(Math.floor((newTotal % 3600) / 60));
          setSeconds(newTotal % 60);
          
          return newTotal;
        });
      }, 1000);
    } else if (totalSeconds === 0 && isActive) {
      setIsActive(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, totalSeconds]);

  const toggleTimer = () => {
    // Only start if there is a valid time entered
    if (!isActive && (hours > 0 || minutes > 0 || seconds > 0)) {
      setTotalSeconds(hours * 3600 + minutes * 60 + seconds);
      setIsActive(true);
    } else {
      setIsActive(false); // Pause
    }
  };

  // Reusable inline styles for the inputs to keep the JSX clean
  const inputStyle = {
    background: 'transparent',
    border: 'none',
    color: '#ffffff',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    width: '3.5rem',
    textAlign: 'center',
    outline: 'none',
    padding: 0
  };

  const labelStyle = {
    color: 'var(--text-muted)',
    fontSize: '0.875rem',
    marginBottom: '0.5rem'
  };

  return (
    <div className="widget-panel" style={{ display: 'flex', gap: '2.5rem', alignItems: 'center', height: '100%', padding: '1.5rem 2rem' }}>
      
      {/* Circular Display with Pink/Red Glow */}
      <div style={{
        width: '9rem',
        height: '9rem',
        borderRadius: '50%',
        border: '4px solid #FF4ADE', 
        boxShadow: '0 0 15px rgba(255, 74, 222, 0.4), inset 0 0 15px rgba(255, 74, 222, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        <span style={{ fontSize: '1.75rem', fontWeight: 'bold', letterSpacing: '2px' }}>
          {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </span>
      </div>
      
      {/* Controls Section */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        
        {/* Number Inputs Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={labelStyle}>Hours</span>
            <input 
              type="number" 
              min="0"
              value={hours} 
              onChange={(e) => setHours(Number(e.target.value))} 
              style={inputStyle} 
              disabled={isActive}
            />
          </div>
          
          <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-muted)', marginTop: '1rem' }}>:</span>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={labelStyle}>Minutes</span>
            <input 
              type="number" 
              min="0"
              max="59"
              value={minutes} 
              onChange={(e) => setMinutes(Number(e.target.value))} 
              style={inputStyle} 
              disabled={isActive}
            />
          </div>
          
          <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-muted)', marginTop: '1rem' }}>:</span>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={labelStyle}>Seconds</span>
            <input 
              type="number" 
              min="0"
              max="59"
              value={seconds} 
              onChange={(e) => setSeconds(Number(e.target.value))} 
              style={inputStyle} 
              disabled={isActive}
            />
          </div>

        </div>

        {/* Start / Pause Button */}
        <button 
          onClick={toggleTimer} 
          style={{
            backgroundColor: isActive ? 'transparent' : '#FF4ADE', // Turns hollow when playing
            color: isActive ? '#FF4ADE' : '#ffffff',
            border: isActive ? '2px solid #FF4ADE' : '2px solid transparent',
            fontWeight: 'bold',
            fontSize: '1.125rem',
            borderRadius: '2rem',
            padding: '0.75rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            width: '100%',
            letterSpacing: '1px'
          }}
        >
          {isActive ? 'PAUSE' : 'START'}
        </button>
      </div>
      
    </div>
  );
};

export default TimerWidget;
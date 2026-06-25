import React, { useEffect, useState } from 'react';
import { fetchCurrentWeather } from '../services/apiServices';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(false);
  
  // Uses the secure API key from your .env file
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; 
  const DEFAULT_CITY = "London";

  useEffect(() => {
    const loadWeather = async () => {
      try {
        const data = await fetchCurrentWeather(DEFAULT_CITY, API_KEY);
        setWeather(data);
      } catch (err) {
        setError(true);
      }
    };
    loadWeather();
  }, []);

  // Format the current date and time
  const date = new Date();
  const formattedDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
  const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

  return (
    <div 
      className="widget-panel" 
      style={{ 
        padding: 0, // Removes the default widget padding so the header can touch the edges
        overflow: 'hidden', 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%',
        border: 'none'
      }}
    >
      {/* Top Header: Date and Time (Pink Background) */}
      <div style={{ 
        backgroundColor: '#FF4A6B', 
        color: '#ffffff', 
        padding: '0.75rem 1.5rem', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        fontSize: '1.25rem', 
        fontWeight: 'bold' 
      }}>
        <span>{formattedDate}</span>
        <span>{formattedTime}</span>
      </div>

      {/* Bottom Content: Weather Data (Dark Background) */}
      <div style={{ 
        backgroundColor: '#101016', 
        padding: '1.5rem', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        flex: 1, 
        color: '#ffffff' 
      }}>
        {error ? (
          <p style={{ color: 'var(--accent-red)' }}>Failed to load weather data.</p>
        ) : !weather ? (
          <p style={{ color: 'var(--text-muted)' }}>Loading weather...</p>
        ) : (
          <>
            {/* 1. Condition & Icon */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '30%' }}>
              <img 
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                alt="weather icon" 
                style={{ width: '5rem', height: '5rem' }}
              />
              <p style={{ fontSize: '1.125rem', textTransform: 'capitalize', textAlign: 'center', marginTop: '-0.5rem' }}>
                {weather.weather[0].description}
              </p>
            </div>
            
            {/* Vertical Divider */}
            <div style={{ width: '2px', height: '4rem', backgroundColor: '#4b5563', margin: '0 1rem' }}></div>
            
            {/* 2. Temperature */}
            <div style={{ width: '35%', textAlign: 'center' }}>
              <h2 style={{ fontSize: '3rem', fontWeight: 'bold', lineHeight: '1.1', marginBottom: '0.5rem' }}>
                {Math.round(weather.main.temp)}°C
              </h2>
              <p style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                 🌡️ {weather.main.pressure} mbar
              </p>
            </div>

            {/* Vertical Divider */}
            <div style={{ width: '2px', height: '4rem', backgroundColor: '#4b5563', margin: '0 1rem' }}></div>

            {/* 3. Wind and Humidity */}
            <div style={{ width: '35%', display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.25rem' }}>💨</span>
                <span>{weather.wind.speed} km/h Wind</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.25rem' }}>💧</span>
                <span>{weather.main.humidity}% Humidity</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherWidget;
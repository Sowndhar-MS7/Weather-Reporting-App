import React, { useState } from 'react';
import { fetchWeatherData } from './api/weatherService';
import WeatherCard from './components/WeatherCard';
import './App.css';

const QUICK_CITIES = ['London', 'Tokyo', 'New York', 'Mumbai', 'Sydney', 'Paris'];

function App() {
  const [city, setCity]         = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const handleSearch = async (searchCity = city) => {
    const query = searchCity.trim();
    if (!query) { setError('Please enter a city name.'); return; }

    setLoading(true);
    setError('');
    setWeatherData(null);

    try {
      const data = await fetchWeatherData(query);
      setWeatherData(data);
    } catch (err) {
      const msg = err.response?.data?.error?.message || 'City not found. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => { if (e.key === 'Enter') handleSearch(); };

  const handleQuick = (c) => { setCity(c); handleSearch(c); };

  return (
    <div className="app">
      <header className="header">
        <p className="badge">☁️ Live Weather</p>
        <h1>Weather Report</h1>
        <p className="subtitle">Search any city to get real-time weather data</p>
      </header>

      <div className="search-wrap">
        <input
          type="text"
          placeholder="Enter city name (e.g. London, Tokyo...)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={() => handleSearch()} disabled={loading}>
          {loading ? 'Loading...' : 'Search'}
        </button>
      </div>

      <div className="suggestions">
        {QUICK_CITIES.map((c) => (
          <button key={c} className="suggest-btn" onClick={() => handleQuick(c)}>{c}</button>
        ))}
      </div>

      {error && (
        <div className="error-box">⚠️ {error}</div>
      )}

      {loading && (
        <div className="loading">
          <div className="spinner" />
          <p>Fetching weather data...</p>
        </div>
      )}

      {weatherData && !loading && <WeatherCard data={weatherData} />}
    </div>
  );
}

export default App;
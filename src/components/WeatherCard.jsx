import React from 'react';

const getWeatherEmoji = (code, isDay) => {
  if (code === 1000) return isDay ? '☀️' : '🌙';
  if (code === 1003) return isDay ? '⛅' : '🌧';
  if ([1006, 1009].includes(code)) return '☁️';
  if ([1063, 1150, 1180, 1183].includes(code)) return '🌦';
  if ([1186, 1189, 1192, 1195, 1240].includes(code)) return '🌧';
  if ([1066, 1210, 1213, 1216, 1225].includes(code)) return '❄️';
  if ([1087, 1273, 1276].includes(code)) return '⛈';
  return '🌤';
};

const getWindDir = (deg) => {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return dirs[Math.round(deg / 45) % 8];
};

const getDayName = (dateStr, i) => {
  if (i === 0) return 'Today';
  if (i === 1) return 'Tomorrow';
  return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short' });
};

const WeatherCard = ({ data }) => {
  const { current: cur, location: loc, forecast } = data;
  const today = forecast.forecastday[0];
  const uvLabel = cur.uv <= 2 ? 'Low' : cur.uv <= 5 ? 'Moderate' : cur.uv <= 7 ? 'High' : 'Very High';

  return (
    <div className="weather-container">

      {/* Main Card */}
      <div className="card main-card">
        <div className="city-info">
          <h2>{loc.name}</h2>
          <p className="country">
            {loc.region ? `${loc.region}, ` : ''}{loc.country} · {loc.localtime.split(' ')[1]}
          </p>
          <span className="condition-badge">
            {getWeatherEmoji(cur.condition.code, cur.is_day)} {cur.condition.text}
          </span>
        </div>
        <div className="temp-display">
          <div className="temp">{Math.round(cur.temp_c)}°<span className="unit">C</span></div>
          <p className="feels">Feels like {Math.round(cur.feelslike_c)}°C</p>
          <p className="feels">{Math.round(cur.temp_f)}°F</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {[
          { label: 'Humidity',      icon: '💧', value: `${cur.humidity}%` },
          { label: 'Wind',          icon: '🌬',  value: `${Math.round(cur.wind_kph)} km/h ${getWindDir(cur.wind_degree)}` },
          { label: 'Visibility',    icon: '👁',  value: `${cur.vis_km} km` },
          { label: 'Pressure',      icon: '🧭', value: `${cur.pressure_mb} hPa` },
          { label: 'UV Index',      icon: '☀️', value: `${cur.uv} (${uvLabel})` },
          { label: 'Precipitation', icon: '🌧', value: `${cur.precip_mm} mm` },
        ].map((s) => (
          <div className="card stat-card" key={s.label}>
            <p className="stat-label">{s.icon} {s.label}</p>
            <p className="stat-value">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Sunrise / Sunset */}
      <div className="card sun-bar">
        <div><p className="stat-label">🌅 Sunrise</p><p className="stat-value">{today.astro.sunrise}</p></div>
        <div><p className="stat-label">🌇 Sunset</p><p className="stat-value">{today.astro.sunset}</p></div>
      </div>

      {/* 5-Day Forecast */}
      <div className="forecast-section">
        <p className="section-title">5-Day Forecast</p>
        <div className="forecast-row">
          {forecast.forecastday.map((day, i) => (
            <div className="card forecast-card" key={day.date}>
              <p className="forecast-day">{getDayName(day.date, i)}</p>
              <p className="forecast-icon">{getWeatherEmoji(day.day.condition.code, true)}</p>
              <p className="forecast-hi">{Math.round(day.day.maxtemp_c)}°</p>
              <p className="forecast-lo">{Math.round(day.day.mintemp_c)}°</p>
            </div>
          ))}
        </div>
      </div>

      <p className="footer">Data from WeatherAPI.com · Updated: {cur.last_updated}</p>
    </div>
  );
};

export default WeatherCard;
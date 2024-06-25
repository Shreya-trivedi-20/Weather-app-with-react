import React, { useState } from 'react';
import './WeatherApp.css';

function WeatherApp() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (city.trim()) {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`
        );
        if (!response.ok) {
          throw new Error('City not found');
        }
        const data = await response.json();
        setWeather(data);
        setError('');
      } catch (err) {
        setError(err.message);
        setWeather(null);
      }
    }
  };

  return (
    <div className="weather-container">
      <div className="weather-header">
        <h1>Weather App</h1>
      </div>
      <div className="weather-body">
        <div className="input-container">
          <input
            type="text"
            value={city}
            onChange={e => setCity(e.target.value)}
            placeholder="Enter city name"
            onKeyPress={e => {
              if (e.key === 'Enter') fetchWeather();
            }}
          />
          <button onClick={fetchWeather}>Get Weather</button>
        </div>
        {error && <p className="error">{error}</p>}
        {weather && (
          <div className="weather-info">
            <h2>{weather.name}</h2>
            <p>{weather.weather[0].description}</p>
            <p>Temperature: {weather.main.temp} °C</p>
            <p>Humidity: {weather.main.humidity} %</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherApp;

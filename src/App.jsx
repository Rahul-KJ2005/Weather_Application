import { useState } from "react";
import style from"./style.css"
export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async (cityName) => {
    try {
      const apiKey = "4e7168b7f845f5513073f1f3dbe7bfc0"; // Get from https://openweathermap.org/
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();
      if (data.cod !== 200) throw new Error(data.message);
      setWeather(data);
    } catch (err) {
      alert("City not found!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
      setCity("");
    }
  };

  return (
    <div className="app">
      <h1 className="title">🌤️ Weather App</h1>

      {/* Search Box */}
      <form onSubmit={handleSubmit} className="search-box">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city..."
          className="search-input"
        />
        <button type="submit" className="search-btn">Search</button>
      </form>
      {weather && (
        <div className="weather-card">
          <h2 className="city-name">{weather.name}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
            alt="Weather Icon"
            className="weather-icon"
          />
          <p className="temperature">{Math.round(weather.main.temp)}°C</p>
          <p className="description">{weather.weather[0].description}</p>
          <div className="extra-info">
            <div>
              <p>💧 Humidity</p>
              <p>{weather.main.humidity}%</p>
            </div>
            <div>
              <p>🌬️ Wind</p>
              <p>{weather.wind.speed} m/s</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

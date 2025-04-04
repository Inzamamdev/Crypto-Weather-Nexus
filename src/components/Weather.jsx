const WeatherCard = ({ weather }) => {
  return (
    <div className="card">
      <h3>{weather.name}</h3>
      <p>🌡 Temp: {weather.main.temp}°C</p>
      <p>💧 Humidity: {weather.main.humidity}%</p>
      <p>⛅ Condition: {weather.weather[0].description}</p>
    </div>
  );
};

export default WeatherCard;

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  return (
    <div className="max-w-sm mx-auto mt-6 bg-white shadow-xl rounded-2xl p-6 text-center">
      <h3 className="text-2xl font-bold text-gray-800">{weather.name}</h3>

      <div className="flex justify-center items-center mt-4">
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="Weather Icon"
          className="w-20 h-20"
        />
      </div>

      <div className="mt-4 text-gray-700 space-y-1">
        <p className="text-lg">
          🌡 <span className="font-semibold">Temp:</span> {weather.main.temp}°C
        </p>
        <p className="text-lg">
          💧 <span className="font-semibold">Humidity:</span>{" "}
          {weather.main.humidity}%
        </p>
        <p className="text-lg capitalize">
          ⛅ <span className="font-semibold">Condition:</span>{" "}
          {weather.weather[0].description}
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;

"use client";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCryptoFailure,
  fetchCryptoStart,
  fetchCryptoSuccess,
} from "@/redux/slices/cryptoSlice";
import {
  fetchNewsFailure,
  fetchNewsStart,
  fetchNewsSuccess,
} from "@/redux/slices/newsSlice";
import {
  fetchWeatherFailure,
  fetchWeatherStart,
  fetchWeatherSuccess,
} from "@/redux/slices/weatherSlice";
import WeatherCard from "@/components/Weather";
import CryptoCard from "@/components/Crypto";
import NewsCard from "@/components/News";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { favoriteCities, favoriteCryptos } = useSelector(
    (state) => state.preferences
  );
  const weathers = useSelector((state) => state.weather);
  const crypto = useSelector((state) => state.crypto);
  const news = useSelector((state) => state.news);

  console.log(news.data?.filter((item) => item.language == "english"));
  useEffect(() => {
    // Fetch Weather
    dispatch(fetchWeatherStart());
    const weatherRequests = favoriteCities.map((city) =>
      axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
      )
    );

    Promise.all(weatherRequests)
      .then((responses) => {
        dispatch(fetchWeatherSuccess(responses.map((res) => res.data)));
      })
      .catch((error) => {
        dispatch(fetchWeatherFailure(error.message));
      });

    // Fetch Crypto
    dispatch(fetchCryptoStart());
    axios
      .get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${favoriteCryptos.join(
          ","
        )}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`
      )
      .then((response) => {
        dispatch(fetchCryptoSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchCryptoFailure(error.message));
      });

    // Fetch News
    dispatch(fetchNewsStart());
    axios
      .get(
        `https://newsdata.io/api/1/latest?apikey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}&q=crypto`
      )
      .then((response) => {
        dispatch(fetchNewsSuccess(response.data.results.slice(0, 6)));
      })
      .catch((error) => {
        dispatch(fetchNewsFailure(error.message));
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            📊 CryptoWeather Nexus
          </h1>
          <p className="text-lg text-gray-600">
            Real-time updates on weather, cryptocurrency, and crypto news.
          </p>
        </header>

        {/* Weather Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            🌍 Weather
          </h2>
          {weathers.loading ? (
            <p className="text-gray-600">Loading weather data...</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {weathers.data?.map((weather) => (
                <WeatherCard key={weather.id} weather={weather} />
              ))}
            </div>
          )}
        </section>

        {/* Crypto Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            💰 Cryptocurrency
          </h2>
          {crypto.loading ? (
            <p className="text-gray-600">Loading crypto prices...</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Object.keys(crypto.data || {}).map((coin) => (
                <CryptoCard key={coin} crypto={crypto.data[coin]} name={coin} />
              ))}
            </div>
          )}
        </section>

        {/* News Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            📰 Crypto News
          </h2>
          {news.loading ? (
            <p className="text-gray-600">Loading news...</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {news.data
                ?.filter((item) => item.language === "english")
                .map((article, index) => (
                  <NewsCard key={index} article={article} />
                ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

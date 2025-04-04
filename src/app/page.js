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
  const weather = useSelector((state) => state.weather);
  const crypto = useSelector((state) => state.crypto);
  const news = useSelector((state) => state.news);

  console.log(process.env.NEXT_PUBLIC_WEATHER_API_KEY);
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
        dispatch(fetchWeatherSuccess(responses.map((res) => conoleres.data)));
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
        `https://newsapi.org/v2/everything?q=crypto&sortBy=publishedAt&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
      )
      .then((response) => {
        dispatch(fetchNewsSuccess(response.data.articles.slice(0, 5)));
      })
      .catch((error) => {
        dispatch(fetchNewsFailure(error.message));
      });
  }, [dispatch, favoriteCities, favoriteCryptos]);

  return (
    <div className="container">
      <h1>📊 Crypto Dashboard</h1>

      {/* Weather */}
      <h2>🌍 Weather</h2>
      {weather.loading ? (
        <p>Loading...</p>
      ) : (
        weather.data.map((w, index) => <WeatherCard key={index} weather={w} />)
      )}

      {/* Crypto */}
      <h2>💰 Cryptocurrency</h2>
      {crypto.loading ? (
        <p>Loading...</p>
      ) : (
        Object.keys(crypto.data || {}).map((coin) => (
          <CryptoCard key={coin} crypto={crypto.data[coin]} name={coin} />
        ))
      )}

      {/* News */}
      <h2>📰 Crypto News</h2>
      {news.loading ? (
        <p>Loading...</p>
      ) : (
        news.data.map((article, index) => (
          <NewsCard key={index} article={article} />
        ))
      )}
    </div>
  );
}

import axios from 'axios';

const API_KEY = 'b9cdd01186a64820a8455602261704';
const BASE_URL = 'https://api.weatherapi.com/v1/forecast.json';

export const fetchWeatherData = async (city) => {
  const response = await axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(city)}&days=5&aqi=no&alerts=no`
  );
  return response.data;
};
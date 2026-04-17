☁️ Weather Report App
A responsive weather application built with React.js that allows users to search and view real-time weather data for any city worldwide using the WeatherAPI.com API.
---
🌐 Live Demo
> Search any city and instantly get temperature, humidity, wind speed, UV index, sunrise/sunset times, and a 5-day forecast.
---
🚀 Features
🔍 Search weather by city name
🌡️ Current temperature in °C and °F with "feels like" data
💧 Humidity, wind speed & direction, visibility, pressure, UV index, precipitation
🌅 Sunrise and sunset times
📅 5-day weather forecast
⚠️ Error handling for invalid city names and failed API requests
📱 Fully responsive design across all screen sizes
⚡ Quick-search buttons for popular cities
---
🛠️ Tech Stack
Technology	Purpose
React.js	    - Frontend UI framework
Axios	        - HTTP requests to Weather API
WeatherAPI.com	- Real-time weather data
CSS3	        - Styling and responsive layout
Flexbox & Grid	- Responsive layout system
useState Hook	- State management
---
📁 Project Structure
```
weather-app/
├── public/
│   └── index.html
├── src/
│   ├── api/
│   │   └── weatherService.js      # Axios API call logic
│   ├── Components/
│   │   └── WeatherCard.jsx        # Weather display component
│   ├── App.js                     # Main app with search & state
│   ├── App.css                    # Styling
│   └── index.js                   # React entry point
├── package.json
└── README.md
```
---
🔌 API Reference
This app uses the WeatherAPI.com Forecast API:
```
GET https://api.weatherapi.com/v1/forecast.json
    ?key=YOUR_API_KEY
    &q={city}
    &days=5
    &aqi=no
    &alerts=no
```
Parameter	Description
`key`	- Your API key
`q`     - City name (user input)
`days`	- Number of forecast days (1–10)
`aqi`	- Air quality data (no/yes)
`alerts`- Weather alerts (no/yes)
---
📸 Screenshots
Home Screen
> Search bar with quick-city buttons and a clean dark UI
Weather Results
> Main temperature card, stats grid (humidity, wind, UV, pressure), sunrise/sunset bar, and 5-day forecast
---
🧩 Components
`App.js`
Manages `city`, `weatherData`, `loading`, and `error` state using `useState`
Calls `fetchWeatherData()` on search
Handles keyboard (Enter) and button click events
Renders `WeatherCard` when data is available
`WeatherCard.jsx`
Receives weather data as props
Displays main weather card, stats grid, sun times, and forecast
Maps weather condition codes to emoji icons
`weatherService.js`
Exports `fetchWeatherData(city)` using Axios
Dynamically builds the API URL with template literals
Throws errors for failed or invalid requests
---
🔧 Error Handling
Scenario	Behavior
Empty input	Shows "Please enter a city name"
Invalid city	Shows API error message
Network failure	Shows "Failed to fetch weather. Try again."
API key invalid	Shows "API key is invalid"
---
📱 Responsive Design
Desktop — Two-column layout with side-by-side cards
Tablet — Auto-fit grid adjusts to available width
Mobile — Stacked single-column layout with scaled typography
CSS Grid with `repeat(auto-fit, minmax(..., 1fr))` and media queries ensure the layout adapts across all screen sizes.
---
📦 Dependencies
```json
{
  "react": "^18.x",
  "react-dom": "^18.x",
  "axios": "^1.x"
}
```
Install with:
```bash
npm install axios
```
---
🙌 Acknowledgements
WeatherAPI.com — Free weather data API
Create React App — Project bootstrapping
---


import './App.css'

import { useEffect, useState } from 'react'

import axios from 'axios'

function App() {
	const [weatherData, setWeatherData] = useState(null)
	const [city, setCity] = useState('')
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`http://api.weatherapi.com/v1/forecast.json?key=${
						import.meta.env.VITE_WEATHER_API
					}&q=${city}&days=7&aqi=yes&alerts=yes`
				)
				setWeatherData(response.data)
				console.log(response.data)
			} catch (error) {
				console.log(error)
			}
		}
		if (city) fetchData()
	}, [city])

	return (
		<>
			<div className="app-container">
				<h1 className="app-ttile">Güncel Haftalık Hava Durumu Uygulaması</h1>
				<div className="input-container">
					<input
						className="input-city"
						type="text"
						placeholder="Şehir Giriniz..."
						value={city}
						onChange={(e) => setCity(e.target.value)}
					/>
				</div>
			</div>
			{weatherData && (
				<div className="weather-container">
					{weatherData.forecast.forecastday.map((day) => (
						<div className="day-container" key={day.date}>
							<h2 className="date">{day.date}</h2>
							<img className="icon" src={day.day.condition.icon} alt={day.day.condition.text} />
							<p className="temperature">{day.day.avgtemp_c} C</p>
							<p className="temperature">{day.day.condition.text} </p>
						</div>
					))}
				</div>
			)}
		</>
	)
}

export default App

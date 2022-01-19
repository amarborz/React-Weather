import './App.css'
import SearchBar from './components/SearchBar'

import 'bootstrap/dist/css/bootstrap.min.css'
import Weather from './components/Weather'
import { useEffect, useState } from 'react'
import Forecast from './components/Forecast'

const API_KEY = 'd0880b50f8ef4ccba65211506221401'
const URL = 'https://api.weatherapi.com/v1'

function App() {
	const [city, setCity] = useState('')
	const [weather, setWeather] = useState(null)
	const [falseInput, setFalseInput] = useState(false)

	const condition = weather ? weather.current.condition.text.toLowerCase() : ''

	const backgroundClass = condition.includes('snow')
		? 'image snow'
		: condition.includes('mist')
		? 'image mist'
		: condition.includes('sun')
		? 'image sun'
		: condition.includes('cloud')
		? 'image cloud'
		: condition.includes('rain')
		? 'image rain'
		: condition.includes('clear')
		? 'image clear'
		: 'image'

	const getCity = (inputCity) => {
		setCity(inputCity)
	}

	useEffect(() => {
		if (!city.length) {
			return
		}

		const fetchWeather = async () => {
			const response = await fetch(
				`${URL}/current.json?key=${API_KEY}&q=${city}`,
			)
			const responseData = await response.json()
			if (responseData.error) {
				setFalseInput(true)
				setWeather('')
				return
			}
			setWeather(responseData)
			setFalseInput(false)
		}

		fetchWeather()
	}, [city])

	return (
		<div className="app">
			<div className={backgroundClass}>
				<SearchBar getCity={getCity} />
				{falseInput && (
					<h2 className="centered">Couldn't find city. Please try again.</h2>
				)}
				{weather && <Weather weather={weather} />}
				{weather && <Forecast city={city} />}
			</div>
		</div>
	)
}

export default App

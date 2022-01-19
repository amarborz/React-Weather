import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'

import classes from './Forecast.module.css'

const API_KEY = 'd0880b50f8ef4ccba65211506221401'
const URL = 'https://api.weatherapi.com/v1'

const Forecast = (props) => {
	const [forecast, setForecast] = useState([])
	const [showForecast, setShowForecast] = useState(false)
	const [showCelsius, setShowCelsius] = useState(true)

	const buttonSymbol = showCelsius ? 'Change to °F ' : 'Change to °C '
	const { city } = props
	const buttonText = !showForecast
		? 'Show 3 Day Forecast'
		: 'Hide 3 Day Forecast'

	useEffect(() => {
		if (!city.length) {
			return
		}

		const fetchForecast = async () => {
			const response = await fetch(
				`${URL}/forecast.json?key=${API_KEY}&q=${city}&days=7`,
			)
			const responseData = await response.json()
			if (responseData.error) {
				console.log(responseData.error.message)
				return
			}
			setForecast(responseData.forecast.forecastday)
		}

		fetchForecast()
	}, [city])

	const showForecastHandler = () => {
		setShowForecast(!showForecast)
	}

	const showCelsiusHandler = () => {
		setShowCelsius(!showCelsius)
	}

	const forecastList = forecast.map((elem, index) => (
		<Card.Body
			key={index}
			style={{ display: 'inline-block' }}
			className={classes.card}
		>
			<h6>{elem.date}</h6>
			{showCelsius && (
				<h5>{`Max/Min Temp: ${elem.day.maxtemp_c} °C / ${elem.day.mintemp_c} °C`}</h5>
			)}
			{!showCelsius && (
				<h5>{`Max/Min Temp: ${elem.day.maxtemp_f} °F / ${elem.day.mintemp_f} °F`}</h5>
			)}
			<Button
				variant="primary"
				size="sm"
				onClick={showCelsiusHandler}
				style={{ marginRight: 20 }}
			>
				{buttonSymbol}
			</Button>
			<img src={`https:${elem.day.condition.icon}`} alt="icon" />
			<h5>{elem.day.condition.text}</h5>
		</Card.Body>
	))

	return (
		<div className={classes.centered}>
			<Button
				variant="primary"
				size="lg"
				className={classes.centered}
				onClick={showForecastHandler}
			>
				{buttonText}
			</Button>
			{showForecast && forecastList}
		</div>
	)
}

export default Forecast

import React, { useState } from 'react'

import { Button, Card } from 'react-bootstrap'
import classes from './Weather.module.css'

const Weather = (props) => {
	const [showCelsius, setShowCelsius] = useState(true)

	const region = `${props.weather.location.region}, ${props.weather.location.country}`
	const city = props.weather.location.name
	const icon = `https:${props.weather.current.condition.icon}`
	const condition = props.weather.current.condition.text
	const celsius = `${props.weather.current.temp_c} °C`
	const fahrenheit = `${props.weather.current.temp_f} °F`
	const temperature = showCelsius ? celsius : fahrenheit
	const buttonSymbol = showCelsius ? 'Change to °F ' : 'Change to °C '
	const localTime = `Local Time: ${props.weather.location.localtime.slice(11)}`

	const changeCelsiusHandler = () => {
		setShowCelsius(!showCelsius)
	}

	return (
		<div style={{ width: '18rem' }} className={classes.centered}>
			<h2>{region}</h2>
			<Card.Body>
				<h3>{city}</h3>
				<h5>{localTime}</h5>
				<h3 style={{ display: 'inline-block' }}>{temperature}</h3>
				<Button variant="primary" size="sm" onClick={changeCelsiusHandler}>
					{buttonSymbol}
				</Button>
				<img src={icon} alt="icon" />

				<h5>{condition}</h5>
			</Card.Body>
		</div>
	)
}

export default Weather

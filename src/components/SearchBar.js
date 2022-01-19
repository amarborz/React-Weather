import React, { useRef } from 'react'
import { Button, Form, FormControl } from 'react-bootstrap'
import classes from './SearchBar.module.css'

const SearchBar = (props) => {
	const cityRef = useRef()

	const passCityHandler = (event) => {
		event.preventDefault()
		props.getCity(cityRef.current.value)
	}

	return (
		<div className={classes.centered}>
			<Form
				className="d-flex"
				style={{ minWidth: '20vw' }}
				onSubmit={passCityHandler}
			>
				<FormControl
					type="search"
					placeholder="Search City"
					className="me-2"
					size="lg"
					ref={cityRef}
				/>
				<Button variant="primary" size="lg" type="submit">
					Search
				</Button>
			</Form>
		</div>
	)
}

export default SearchBar

import React from 'react'
import PropTypes from 'prop-types'
import { Pane, Button } from 'evergreen-ui'

const ProductCard = ({ name, age, imgSrc, description, onCtaClick }) => {
	return (
		<Pane
			borderWidth="1px"
			borderColor="#EEE"
			borderStyle="solid"
			borderRadius="5px"
			display="grid"
			gridTemplateColumns="1fr 1fr"
		>
			<img alt={name} src={imgSrc} width="100%" />
			<Pane padding="10px">
				<h3 style={{ marginTop: 0 }}>
					{name}, {age}
				</h3>
				<h5>{description}</h5>
				<Button onClick={() => onCtaClick({ imgSrc, name })}>Adopt</Button>
			</Pane>
		</Pane>
	)
}

ProductCard.propTypes = {
	age: PropTypes.number.isRequired,
	description: PropTypes.string.isRequired,
	onCtaClick: PropTypes.func.isRequired,
	imgSrc: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
}

export default ProductCard

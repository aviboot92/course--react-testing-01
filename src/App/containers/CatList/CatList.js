import React from 'react'
import styled from 'styled-components'
import { Pane, toaster, SelectMenu, Button } from 'evergreen-ui'
import getCopy from '../../helpers/getCopy'
import CatsService from '../../services/CatService'
import ProductCard from '../../components/ProductCard/ProductCard'

// HELPERS
/**
 * @param {Array<Object>} cats
 * @param {string} selectedDescription
 * @return {Array<Object>}
 */
export function getFilteredCats(cats, selectedDescription) {
	if (!selectedDescription) {
		return cats
	}

	return cats.filter(cat => {
		return cat.description.toLowerCase().includes(selectedDescription)
	})
}

/**
 * @param {Array<Object>} cats
 * @returns {Array<string>}
 */
export function getAvailableDescriptions(cats) {
	return cats.reduce((uniqDescs, cat) => {
		const descs = cat.description.split(', ')
		for (const desc of descs) {
			const lc = desc.toLowerCase()
			if (!uniqDescs.includes(lc)) {
				uniqDescs.push(lc)
			}
		}

		return uniqDescs
	}, [])
}

/**
 * @param {string} selectedDescription
 * @returns {string}
 */
export function getDescriptionFilterLabel(selectedDescription) {
	return selectedDescription || 'Select description'
}

/**
 * @param {Array<string>} availableDescriptions 
 * @returns {Array<{ value: string, label: string }>}
 */
export function getDescriptionFilterOptions(availableDescriptions) {
	return availableDescriptions.map(label => ({ label, value: label }))
}


export default class CatList extends React.Component {
	state = {
		cats: [],
		selectedDescription: undefined,
	}

	async componentDidMount() {
		const cats = await CatsService.getCats()
		this.setState({ cats })
	}

	/**
	 * @param {Object<{ imgSrc: string, name: string }} productObj
	 */
	onAdoptClick = cat => {
		toaster.success(`You have successfully adopted ${cat.name}!`)
		const cats = this.state.cats.filter(c => c.image !== cat.imgSrc)
		this.setState({ cats })
	}

	/**
	 * @param {Object<{ value: any, label: string }>} filterItem
	 */
	handleDescriptionFilter = ({ value }) => {
		this.setState({ selectedDescription: value })
	}

	render() {
		const { cats, selectedDescription } = this.state
		const filteredCats = getFilteredCats(cats, selectedDescription)
		const availableDescriptions = getAvailableDescriptions(cats)
		const descriptionFilterOptions = getDescriptionFilterOptions(availableDescriptions)
		const descriptionFilterLabel = getDescriptionFilterLabel(selectedDescription)

		return (
			<Styled>
				<Pane className="filters">
					<SelectMenu
						hasTitle={false}
						hasFilter={false}
						options={descriptionFilterOptions}
						selected={selectedDescription}
						onSelect={this.handleDescriptionFilter}
						closeOnSelect={true}
					>
						<Button>{descriptionFilterLabel}</Button>
					</SelectMenu>
				</Pane>
				<Pane className="list">
					{filteredCats.map(cat => (
						<Pane margin="10px" key={cat.image}>
							<ProductCard
								name={cat.name}
								age={cat.age}
								imgSrc={cat.image}
								description={cat.description}
								ctaText={getCopy('adoptCtaText')}
								onCtaClick={this.onAdoptClick}
							/>
						</Pane>
					))}
				</Pane>
			</Styled>
		)
	}
}

const Styled = styled(Pane)`
	.filters {
		margin: 10px;
	}
	.list {
		display: grid;
		grid-template-columns: 1fr;
		@media (min-width: 768px) {
			grid-template-columns: repeat(2, 1fr);
		}
	}
`

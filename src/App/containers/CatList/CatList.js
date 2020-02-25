import React from 'react'
import styled from 'styled-components'
import { Pane, toaster, SelectMenu, Button } from 'evergreen-ui'
import getCopy from '../../helpers/getCopy'
import CatsService from '../../services/CatService'
import ProductCard from '../../components/ProductCard/ProductCard'

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
	 * @return {Array<{Object}>}
	 */
	get filteredCats() {
		if (!this.state.selectedDescription) {
			return this.state.cats
		}

		return this.state.cats.filter(cat => {
			return cat.description.toLowerCase().includes(this.state.selectedDescription)
		})
	}

	/**
	 * @returns {Array<{string}>}
	 */
	get availableDescriptions() {
		return this.state.cats.reduce((uniqDescs, cat) => {
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
	 * @returns {Array<{ value: string, label: string }>}
	 */
	get descriptionFilterOptions() {
		return this.availableDescriptions.map(label => ({ label, value: label }))
	}

	/**
	 * @returns {string}
	 */
	get descriptionFilterLabel() {
		return this.state.selectedDescription || 'Select description'
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
		return (
			<Styled>
				<Pane className="filters">
					<SelectMenu
						hasTitle={false}
						hasFilter={false}
						options={this.descriptionFilterOptions}
						selected={this.state.selectedDescription}
						onSelect={this.handleDescriptionFilter}
						closeOnSelect={true}
					>
						<Button>{this.descriptionFilterLabel}</Button>
					</SelectMenu>
				</Pane>
				<Pane className="list">
					{this.filteredCats.map(cat => (
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

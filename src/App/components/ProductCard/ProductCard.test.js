import React from 'react'
import ProductCard from './ProductCard'
import { render, fireEvent } from '@testing-library/react'

const props = {
  age: 5,
  description: 'Shy, Sweet',
  onCtaClick: jest.fn(),
  imgSrc: 'imgSrc',
  name: 'Napoleon',
}

test('renders as expected', () => {
  const { asFragment, getByText, getByAltText } = render(<ProductCard {...props} />)
  expect(asFragment()).toMatchSnapshot()

  expect(getByText(props.description)).toBeInTheDocument()
  expect(getByText(`${props.name}, ${props.age}`)).toBeInTheDocument()
  expect(getByAltText(props.name)).toBeInTheDocument()
  expect(getByText('Adopt')).toBeInTheDocument()
})

test('calls onCtaClick with imgSrc and name when cta is clicked', () => {
  props.onCtaClick.mockClear()
  const { getByText } = render(<ProductCard {...props} />)
  const buttonEl = getByText('Adopt')
  fireEvent.click(buttonEl)
  expect(props.onCtaClick).toHaveBeenCalledWith({ name: props.name, imgSrc: props.imgSrc })
})

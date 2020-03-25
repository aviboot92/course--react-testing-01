import React from 'react'
import { toaster } from 'evergreen-ui'
import { render, fireEvent } from '@testing-library/react'
import CatList, { getFilteredCats, getAvailableDescriptions, getDescriptionFilterLabel, getDescriptionFilterOptions } from './CatList'

const mockCats = [
  { name: 'Napoleon', description: 'Cheeky, Strong', age: 11, image: 'image1' },
  { name: 'Sooty', description: 'Cheeky, Quiet', age: 14, image: 'image2' },
]

jest.mock('../../services/CatService', () => ({
  getCats: () => mockCats
}))


describe('getFilteredCats()', () => {
  it('should return cats when !selectedDescription', () => {
    expect(getFilteredCats(mockCats)).toEqual(mockCats)
  })
  
  it('should return cats filtered by lowercase descrption', () => {
    expect(getFilteredCats(mockCats, 'strong')).toEqual(mockCats.slice(0, 1))
  })
})

describe('getAvailableDescriptions()', () => {
  it('should return an empty array when !cats.length', () => {
    expect(getAvailableDescriptions([])).toEqual([])
  })

  it('should return a unique list of lowercase cat descriptions', () => {
    expect(getAvailableDescriptions(mockCats)).toEqual(['cheeky', 'strong', 'quiet'])
  })
})

describe('getDescriptionFilterLabel()', () => {
  it('should return selectedDescription when truthy', () => {
    expect(getDescriptionFilterLabel('a')).toBe('a')
  })

  it('should default to "Select description" when !selectedDescription', () => {
    expect(getDescriptionFilterLabel()).toBe('Select description')
  })
})

describe('getDescriptionFilterOptions()', () => {
  it('should return an array of filter options', () => {
    expect(getDescriptionFilterOptions(['a', 'b'])).toEqual([
      { value: 'a', label: 'a' },
      { value: 'b', label: 'b' }
    ])
  })
})


test('renders as expected', async () => {
  const { asFragment, getByText, getAllByText } = await render(<CatList />)
  expect(asFragment()).toMatchSnapshot()

  expect(getByText('Select description')).toBeInTheDocument()
  expect(getAllByText('Adopt')).toHaveLength(mockCats.length)
})

test('supports filtering of cats with select menu', async () => {
  const { getByText, getAllByText, queryByText } = await render(<CatList />)
  fireEvent.click(getByText('Select description'))
  const sweetOption = getByText('strong')
  fireEvent.click(sweetOption)
  expect(getAllByText('strong')[0].tagName).toBe('BUTTON')
  expect(queryByText('Sooty')).not.toBeInTheDocument()
})

test('filters cat from list when adopt clicked and fires toaster success message', async () => {
  const toasterSuccessSpy = jest.spyOn(toaster, 'success')
  const { getByText, getAllByText, queryByText } = await render(<CatList />)
  const firstCatCta = getAllByText('Adopt')[0]
  fireEvent.click(firstCatCta)
  expect(toasterSuccessSpy).toHaveBeenCalledWith(`You have successfully adopted ${mockCats[0].name}!`)
  expect(queryByText('Napoleon')).not.toBeInTheDocument()
  expect(getByText('Sooty, 14')).toBeInTheDocument()
})

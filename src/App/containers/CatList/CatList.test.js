import React from 'react'
import { shallow } from 'enzyme'
import { toaster, SelectMenu } from 'evergreen-ui'
import CatList from './CatList'

const mockCats = [
  { name: 'Buba', description: 'Affectionate, Shy', age: 5, image: 'image1' },
  { name: 'Mittens', description: 'Affectionate, Cheeky', age: 9, image: 'image2' }
]

jest.mock('../../services/CatService', () => ({
  getCats: () => mockCats
}))

describe('<CatList />', () => {

  describe('componentDidMount()', () => {
    it('should getCats from CatsService and set to state', async () => {
      const instance = await shallow(<CatList />).instance()
      instance.state.cats = []
      await instance.componentDidMount()
      expect(instance.state.cats).toEqual(mockCats)
    })    
  })  

  describe('get filteredCats()', () => {
    const instance = shallow(<CatList />).instance()
    it('should return state.cats when !state.selectedDescription', () => {
      instance.state.cats = mockCats
      instance.state.selectedDescription = undefined
      expect(instance.filteredCats).toEqual(mockCats)
    })
    it('should return cats filtered by description', () => {
      instance.state.cats = mockCats
      instance.state.selectedDescription = 'cheeky'
      expect(instance.filteredCats).toEqual(mockCats.slice(1))
    })
  })

  describe('get availableDescriptions()', () => {
    const instance = shallow(<CatList />).instance()
    it('should return an empty array when no cats', () => {
      instance.state.cats = []
      expect(instance.availableDescriptions).toEqual([])
    })
    it('should return an array of lowercase unique descriptions', () => {
      instance.state.cats = mockCats
      expect(instance.availableDescriptions).toEqual(['affectionate', 'shy', 'cheeky'])
    })
  })

  describe('get descriptionFilterOptions()', () => {
    const instance = shallow(<CatList />).instance()
    it('should return expected array of filter options', () => {
      jest.spyOn(instance, 'availableDescriptions', 'get').mockReturnValue(['a', 'b'])
      expect(instance.descriptionFilterOptions).toEqual([
        { value: 'a', label: 'a' }, { value: 'b', label: 'b' },
      ])
    })  
  })

  describe('get descriptionFilterLabel()', () => {
    const instance = shallow(<CatList />).instance()
    it('should be state.selectedDescription when truthy', () => {
      instance.state.selectedDescription = 'a'
      expect(instance.descriptionFilterLabel).toBe('a')
    })
    it('should default to "Select description"', () => {
      instance.state.selectedDescription = undefined
      expect(instance.descriptionFilterLabel).toBe('Select description')
    })
  })

  describe('onAdoptClick()', () => {
    const instance = shallow(<CatList />).instance()
    const toasterSuccessSpy = jest.spyOn(toaster, 'success')
    beforeEach(() => {
      toasterSuccessSpy.mockClear()
      instance.state.cats = mockCats
    })
    it('should call toaster.success and filter cat from state', () => {
      instance.onAdoptClick({ name: mockCats[0].name, imgSrc: mockCats[0].image })
      expect(toasterSuccessSpy).toHaveBeenCalledWith(`You have successfully adopted ${mockCats[0].name}!`)
      expect(instance.state.cats).toEqual(mockCats.slice(1))
    })
  })

  describe('handleDescriptionFilter()', () => {
    const instance = shallow(<CatList />).instance()
    it('should set value to state.selectedDescription', () => {
      instance.state.selectedDescription = undefined
      instance.handleDescriptionFilter({ value: 'a' })
      expect(instance.state.selectedDescription).toBe('a')
    })
  })

  describe('render()', () => {
    it('should render as expected', async () => {
      const wrapper = await shallow(<CatList />)
      expect(wrapper).toMatchSnapshot()
    })
    it('should render essential elements', async () => {
      const wrapper = await shallow(<CatList />)
      expect(wrapper.find(SelectMenu).length).toBe(1)
      expect(wrapper.find('ProductCard').length).toBe(mockCats.length)
    })
  })
})

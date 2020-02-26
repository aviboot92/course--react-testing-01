import React from 'react'
import { shallow } from 'enzyme'
import { Button } from 'evergreen-ui'
import ProductCard from './ProductCard'

const essentialProps = {
  age: 5,
  description: 'Affectionate, Cheeky',
  onCtaClick: jest.fn(),
  imgSrc: 'imgSrc',
  name: 'Buba',
}

describe('<ProductCard />', () => {
  it('should render as expected', () => {
    const wrapper = shallow(<ProductCard {...essentialProps} />)
    expect(wrapper).toMatchSnapshot()
  })
  it('should render essential elements', () => {
    const wrapper = shallow(<ProductCard {...essentialProps} />)
    expect(wrapper.find('img').props()).toEqual({
      alt: 'Buba',
      src: 'imgSrc',
      width: '100%',
    })
    expect(wrapper.find('h3').text()).toBe('Buba, 5')
    expect(wrapper.find('h5').text()).toBe('Affectionate, Cheeky')
    expect(wrapper.find(Button).childAt(0).text()).toBe('Adopt')
  })
  it('should call onCtaClick with imgSrc and name when button is clicked', () => {
    const wrapper = shallow(<ProductCard {...essentialProps} />)
    essentialProps.onCtaClick.mockClear()
    wrapper.find(Button).simulate('click')
    expect(essentialProps.onCtaClick).toHaveBeenCalledWith({
      imgSrc: essentialProps.imgSrc,
      name: essentialProps.name
    })
  })
})

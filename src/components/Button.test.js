import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';

describe('Button', () => {
  const mockClick = jest.fn();
  
  const props = {
    onClick: mockClick,
    text: 'example',
    className: 'btn-default',
  };

  const wrapper = shallow(<Button {...props} />);
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a `button`', () => {
    expect(wrapper.find('button')).toExist();
  });

  it('calls the `click` callback', () => {
    wrapper.find('button').simulate('click');
    expect(mockClick).toHaveBeenCalled();
  });

});

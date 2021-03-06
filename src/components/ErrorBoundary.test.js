import React from 'react';
import { shallow, mount } from 'enzyme';
import ErrorBoundary from './ErrorBoundary';

function ProblemChild() {
  throw new Error('Error thrown from problem child');
  return <h1>Something went wrong</h1>; //eslint-disable-line
}
describe('<ErrorBoundary />', () => {
  const wrapper = shallow(<ErrorBoundary />);
  it('displays an error message on error generated by child', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('initialises a `state` with hasError which is false', () => {
    expect(wrapper.state()).toEqual({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  });

  describe('#componentDidCatch', () => {
    // pare down the crazy console output which is spat out as a result of causing an error on purpose
    jest.spyOn(window._virtualConsole, 'emit').mockImplementation(() => false);

    const spy = jest.spyOn(ErrorBoundary.prototype, 'componentDidCatch');
    const mounted = mount(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    it('should catch errors with `componentDidCatch`', () => {
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should set the `state.hasError` to true in componentDidCatch', () => {
      expect(mounted.state().hasError).toEqual(true);
    });
  });
});

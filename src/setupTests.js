import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
// import 'jest-dom/extend-expect';

configure({ adapter: new Adapter() });
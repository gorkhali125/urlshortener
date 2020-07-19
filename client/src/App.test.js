import React from 'react';
import { shallow } from 'enzyme';
import { render, queryByAttribute } from '@testing-library/react';
import App from './App';
const getById = queryByAttribute.bind(null, 'id');

it('renders without crashing', () => {
  shallow(<App />);
});

it('renders form and has input field', () => {  
  const dom = render(<App />);
  const input = getById(dom.container, "originalUrl");
  expect(input).toBeInTheDocument();
});
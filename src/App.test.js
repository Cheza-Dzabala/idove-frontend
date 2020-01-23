import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Renders welcome message', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Welcome to iDove Platform/i);
  expect(linkElement).toBeInTheDocument();
});

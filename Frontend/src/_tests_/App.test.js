import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders Task Board title', () => {
  render(<App />);
  const title = screen.getByText(/Task Board/i);
  expect(title).toBeInTheDocument();
});

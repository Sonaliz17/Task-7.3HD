import React from 'react';

import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders login form', () => {
  render(<App />);
  expect(screen.getByText(/login/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

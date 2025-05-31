import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders Task Board heading', () => {
  render(<App />);
  const linkElement = screen.getByText(/Task Board/i);
  expect(linkElement).toBeInTheDocument();
});

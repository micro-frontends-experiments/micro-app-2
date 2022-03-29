import { render, screen } from '@testing-library/react';
import App from './App';

test('App 2 header has been rendered', () => {
  render(<App />);
  const linkElement = screen.getByText(/App 2/i);
  expect(linkElement).toBeInTheDocument();
});

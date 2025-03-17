import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders todo list', () => {
    render(<App />);
    const headerElement = screen.getByText(/Todo List/i);
    expect(headerElement).toBeInTheDocument();
  });
});

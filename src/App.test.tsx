import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('App', () => {
  it('should render operator panel when not in board view', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Weselna Familiada' })).toBeInTheDocument();
  });
});

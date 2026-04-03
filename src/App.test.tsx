import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('App', () => {
  it('should render title and theme demo elements', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Weselna Familiada' })).toBeInTheDocument();
    expect(screen.getByText('Przykładowa odpowiedź')).toBeInTheDocument();
    expect(screen.getByText('Odkryta odpowiedź')).toBeInTheDocument();
    expect(screen.getByText('PUNKTY')).toBeInTheDocument();
    expect(screen.getByText('120')).toBeInTheDocument();
  });

  it('should apply revealed class to the second answer row', () => {
    render(<App />);

    const rows = document.querySelectorAll('.answer-row');
    expect(rows).toHaveLength(2);
    expect(rows[0]).not.toHaveClass('revealed');
    expect(rows[1]).toHaveClass('revealed');
  });
});

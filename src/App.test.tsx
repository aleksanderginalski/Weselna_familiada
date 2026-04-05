import { render, screen } from '@testing-library/react';
import { App } from './App';

const mockGameData = {
  config: {
    mode: 'fixed' as const,
    numberOfRounds: 1,
    multipliers: [1],
    teams: { left: { name: 'Lewa' }, right: { name: 'Prawa' } },
  },
  rounds: [{ question: 'Pytanie testowe?', answers: [{ text: 'Odpowiedź', points: 10 }] }],
};

beforeEach(() => {
  global.fetch = vi.fn().mockResolvedValue({
    json: () => Promise.resolve(mockGameData),
  } as Response);
});

describe('App', () => {
  it('should render operator panel when not in board view', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /WESELNA FAMILIADA — Panel Operatora/i })).toBeInTheDocument();
  });
});

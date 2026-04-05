import { render, screen } from '@testing-library/react';
import { AnswerRow } from './AnswerRow';

const ANSWER = { text: 'Wakacje nad morzem', points: 30 };

describe('AnswerRow', () => {
  it('should show number, mask, and hide points when not revealed', () => {
    render(<AnswerRow answer={ANSWER} index={0} isRevealed={false} totalAnswers={6} />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('████████████████████')).toBeInTheDocument();
    expect(screen.queryByText('Wakacje nad morzem')).not.toBeInTheDocument();
    expect(screen.queryByText('30')).not.toBeInTheDocument();
  });

  it('should show number, answer text, and points when revealed', () => {
    render(<AnswerRow answer={ANSWER} index={2} isRevealed={true} totalAnswers={6} />);

    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Wakacje nad morzem')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.queryByText('████████████████████')).not.toBeInTheDocument();
  });

  it('should apply revealed CSS class only when revealed', () => {
    const { rerender } = render(
      <AnswerRow answer={ANSWER} index={0} isRevealed={false} totalAnswers={6} />,
    );
    expect(document.querySelector('.answer-row')).not.toHaveClass('revealed');

    rerender(<AnswerRow answer={ANSWER} index={0} isRevealed={true} totalAnswers={6} />);
    expect(document.querySelector('.answer-row')).toHaveClass('revealed');
  });
});

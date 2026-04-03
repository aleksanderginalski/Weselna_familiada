// Theme verification component — demonstrates Familiada custom Tailwind classes.
// Will be replaced by the real game UI in later User Stories.

export function App() {
  return (
    <div className="min-h-screen bg-familiada-bg-dark flex flex-col items-center justify-center gap-8 p-8">
      <h1 className="font-display text-5xl text-familiada-gold text-glow-gold">
        Weselna Familiada
      </h1>

      <div className="w-full max-w-lg flex flex-col gap-3">
        <div className="answer-row">
          <span className="font-display text-familiada-gold text-xl">1</span>
          <span className="text-familiada-text-primary font-body text-lg">Przykładowa odpowiedź</span>
          <span className="font-display text-familiada-gold text-xl">42</span>
        </div>

        <div className="answer-row revealed">
          <span className="font-display text-familiada-gold text-xl">2</span>
          <span className="text-familiada-text-primary font-body text-lg">Odkryta odpowiedź</span>
          <span className="font-display text-familiada-gold text-xl">28</span>
        </div>
      </div>

      <div className="score-display">
        <div className="text-sm text-familiada-text-secondary mb-1">PUNKTY</div>
        <div>120</div>
      </div>
    </div>
  );
}

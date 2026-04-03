import tailwindConfig from '../../tailwind.config.js';

// Guard against accidental color drift from the Design Brief.
// If these fail, update tailwind.config.js AND docs/Weselna_familiada_design_brief.md together.
describe('Tailwind Familiada theme', () => {
  const colors = tailwindConfig.theme.extend.colors['familiada'];

  it('should define all required Design Brief color tokens with correct hex values', () => {
    expect(colors['bg-dark']).toBe('#0a1628');
    expect(colors['bg-panel']).toBe('#1a2744');
    expect(colors['gold']).toBe('#fbbf24');
    expect(colors['red']).toBe('#ef4444');
    expect(colors['border']).toBe('#334155');
    expect(colors['text-primary']).toBe('#ffffff');
    expect(colors['text-secondary']).toBe('#9ca3af');
  });

  it('should define component-level color tokens', () => {
    expect(colors['answer-hidden']).toBeDefined();
    expect(colors['answer-revealed']).toBeDefined();
    expect(colors['gold-dark']).toBeDefined();
  });
});

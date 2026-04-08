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

// TC-125
describe('Tailwind font families (US-027)', () => {
  const fonts = tailwindConfig.theme.extend.fontFamily;

  it('should define font-display as Familiada-2 for the dot-matrix board', () => {
    expect(fonts['display'][0]).toBe('Familiada-2');
  });

  it('should define font-heading as Familiada for headings and labels outside the board', () => {
    expect(fonts['heading'][0]).toBe('Familiada');
  });

  it('should define font-body as Arial', () => {
    expect(fonts['body'][0]).toBe('Arial');
  });
});

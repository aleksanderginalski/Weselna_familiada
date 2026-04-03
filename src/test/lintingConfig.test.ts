import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { describe, it, expect } from 'vitest';

const root = resolve(__dirname, '../../');

describe('Linting and Formatting Configuration', () => {
  describe('Prettier', () => {
    it('should have .prettierrc config file', () => {
      expect(existsSync(resolve(root, '.prettierrc'))).toBe(true);
    });

    it('should configure consistent code style rules', () => {
      const config = JSON.parse(readFileSync(resolve(root, '.prettierrc'), 'utf-8'));

      expect(config.singleQuote).toBe(true);
      expect(config.semi).toBe(true);
      expect(config.tabWidth).toBe(2);
      expect(config.trailingComma).toBe('all');
      expect(config.printWidth).toBe(100);
    });
  });

  describe('ESLint', () => {
    it('should include prettier in extends to prevent ESLint/Prettier rule conflicts', () => {
      const content = readFileSync(resolve(root, '.eslintrc.cjs'), 'utf-8');

      expect(content).toContain("'prettier'");
    });
  });

  describe('package.json scripts', () => {
    it('should define lint, lint:fix, and format scripts', () => {
      const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf-8'));

      expect(pkg.scripts['lint']).toBeDefined();
      expect(pkg.scripts['lint:fix']).toBeDefined();
      expect(pkg.scripts['format']).toBeDefined();
    });
  });
});

describe('Testing Framework Configuration', () => {
  describe('package.json scripts', () => {
    it('should define test, test:watch, and test:coverage scripts', () => {
      const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf-8'));

      expect(pkg.scripts['test']).toBeDefined();
      expect(pkg.scripts['test:watch']).toBeDefined();
      expect(pkg.scripts['test:coverage']).toBeDefined();
    });
  });
});

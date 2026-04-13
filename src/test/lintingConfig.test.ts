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

describe('CI Configuration', () => {
  it('should have GitHub Actions workflow file', () => {
    expect(existsSync(resolve(root, '.github/workflows/ci.yml'))).toBe(true);
  });

  it('should configure workflow to run lint and tests on push and pull_request', () => {
    const content = readFileSync(resolve(root, '.github/workflows/ci.yml'), 'utf-8');

    expect(content).toContain('name: CI');
    expect(content).toContain('push:');
    expect(content).toContain('pull_request:');
    expect(content).toContain('npm run lint');
    expect(content).toContain('npm test');
  });

  it('should have CI status badge in README', () => {
    const readme = readFileSync(resolve(root, 'README.md'), 'utf-8');

    expect(readme).toContain('ci.yml/badge.svg');
    expect(readme).toContain('actions/workflows/ci.yml');
  });

  it('should have build job that depends on ci job and runs npm run build', () => {
    const content = readFileSync(resolve(root, '.github/workflows/ci.yml'), 'utf-8');

    expect(content).toContain('build:');
    expect(content).toContain('needs: ci');
    expect(content).toContain('npm run build');
  });

  it('should upload build artifact with 1-day retention', () => {
    const content = readFileSync(resolve(root, '.github/workflows/ci.yml'), 'utf-8');

    expect(content).toContain('upload-artifact');
    expect(content).toContain('build-dist');
    expect(content).toContain('retention-days: 1');
  });
});

describe('TypeScript Configuration', () => {
  it('should exclude test files from production compilation', () => {
    const content = readFileSync(resolve(root, 'tsconfig.json'), 'utf-8');

    expect(content).toContain('"exclude"');
    expect(content).toContain('src/**/*.test.ts');
    expect(content).toContain('src/**/*.test.tsx');
    expect(content).toContain('src/test/**/*');
  });
});

// TC-193 through TC-197: US-032 Electron setup
describe('Electron Configuration', () => {
  it('TC-193: package.json should point main to compiled Electron entry', () => {
    const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf-8'));

    expect(pkg.main).toBe('dist-electron/main.js');
  });

  it('TC-194: package.json should define electron:dev and electron:build scripts', () => {
    const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf-8'));

    expect(pkg.scripts['electron:dev']).toBeDefined();
    expect(pkg.scripts['electron:build']).toBeDefined();
    expect(pkg.scripts['electron:compile']).toBeDefined();
  });

  it('TC-195: tsconfig.electron.json should compile to ESNext module targeting dist-electron', () => {
    const config = JSON.parse(readFileSync(resolve(root, 'tsconfig.electron.json'), 'utf-8'));

    expect(config.compilerOptions.module).toBe('ESNext');
    expect(config.compilerOptions.outDir).toBe('dist-electron');
    expect(config.include).toContain('electron');
  });

  it('TC-196: vite.config.ts should not auto-open browser (Electron opens its own window)', () => {
    const content = readFileSync(resolve(root, 'vite.config.ts'), 'utf-8');

    expect(content).toContain('open: false');
  });

  it('TC-197: .gitignore should exclude Electron build output', () => {
    const content = readFileSync(resolve(root, '.gitignore'), 'utf-8');

    expect(content).toContain('dist-electron/');
  });
});

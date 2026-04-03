import { existsSync } from 'fs';
import { resolve } from 'path';
import { describe, it, expect } from 'vitest';

const root = resolve(__dirname, '../../');

describe('Project Structure', () => {
  const requiredDirs = [
    'src/components/board',
    'src/components/operator',
    'src/components/shared',
    'src/components/screens',
    'src/hooks',
    'src/store',
    'src/types',
    'src/utils',
    'src/test',
    'src/assets/sounds',
    'public',
    'docs',
  ];

  it.each(requiredDirs)('should have required directory: %s', (dir) => {
    expect(existsSync(resolve(root, dir))).toBe(true);
  });

  const requiredFiles = [
    '.gitignore',
    'README.md',
    'package.json',
    'tsconfig.json',
    'vite.config.ts',
    'index.html',
  ];

  it.each(requiredFiles)('should have required file: %s', (file) => {
    expect(existsSync(resolve(root, file))).toBe(true);
  });
});

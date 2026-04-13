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
    // TC-126: US-027 font assets must be served as static files
    'public/fonts/Familiada-2.otf',
    'public/fonts/familiada.ttf',
    'public/fonts/familiada.woff2',
    // TC-192: US-032 Electron entry files must exist
    'electron/main.ts',
    'tsconfig.electron.json',
  ];

  it.each(requiredFiles)('should have required file: %s', (file) => {
    expect(existsSync(resolve(root, file))).toBe(true);
  });
});

# Current Task — US-033

## Context
US-032 added Electron setup with `electron/main.ts` and basic scripts.
The current `electron:build` script only compiles TypeScript and runs Vite build —
it does NOT produce a distributable installer. This US wires up `electron-builder`
to produce a Windows NSIS `.exe` installer that works on a clean machine.

## Read
- `package.json` — current scripts and dependencies
- `electron/main.ts` — Electron main process (already implemented)
- `tsconfig.electron.json` — Electron TS config

## Tasks

1. **Install electron-builder**
   Add `electron-builder` to devDependencies in `package.json`.

2. **Create app icon**
   Add `build/icon.ico` — a simple placeholder icon (256×256, `.ico` format).
   Use any publicly available tool or embed a minimal valid `.ico` binary.
   The file must exist at `build/icon.ico` for electron-builder to pick it up.

3. **Configure electron-builder**
   Add `"build"` section to `package.json` (or create `electron-builder.yml`):
   ```json
   "build": {
     "appId": "com.weselna.familiada",
     "productName": "Weselna Familiada",
     "directories": {
       "output": "dist-installer"
     },
     "files": [
       "dist/**/*",
       "dist-electron/**/*",
       "public/**/*"
     ],
     "win": {
       "target": "nsis",
       "icon": "build/icon.ico"
     },
     "nsis": {
       "oneClick": true,
       "perMachine": false,
       "createDesktopShortcut": true,
       "createStartMenuShortcut": true
     }
   }
   ```

4. **Update `electron:build` script in `package.json`**
   Current: `"electron:build": "tsc -p tsconfig.electron.json && vite build"`
   New:
   ```
   "electron:build": "tsc -p tsconfig.electron.json && vite build && electron-builder"
   ```

5. **Update `.gitignore`**
   Add `dist-installer/` to `.gitignore` so the output folder is not committed.

## Constraints
- Do NOT modify any React components or game logic
- Do NOT change `electron/main.ts`
- `electron-builder` must be devDependency only
- Output directory must be `dist-installer/` (not `dist-electron/`) to avoid
  name collision with the compiled Electron main process
- `package.json` already has `"type": "module"` — electron-builder handles this correctly
- No `any` types, no TypeScript changes beyond what is needed

## After implementation
- Run linter: `npm run lint`
- Run tests: `npm test`

### Manual verification steps (Polish)
1. Uruchom `npm run electron:build` — komenda powinna zakończyć się bez błędów
2. Sprawdź że folder `dist-installer/` został utworzony
3. Sprawdź że w `dist-installer/` znajduje się plik `.exe` z nazwą "Weselna Familiada"
4. Uruchom instalator — powinien zainstalować aplikację bez pytania o Node.js
5. Sprawdź menu Start — powinna pojawić się "Weselna Familiada" z ikoną
6. Uruchom zainstalowaną aplikację — Panel Operatora powinien się otworzyć normalnie
7. Odłącz internet i uruchom ponownie — aplikacja działa offline

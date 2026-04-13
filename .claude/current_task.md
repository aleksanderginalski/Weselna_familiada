# Current Task — US-032

## Context

Adding Electron as a desktop shell for Weselna Familiada. The app currently runs in a browser (Vite dev server). We need to wrap it in Electron so it launches as a native Windows desktop app with two BrowserWindows (Operator panel + Game Board). Communication between windows uses BroadcastChannel API — must verify it works between Electron renderer processes. If not, implement IPC relay fallback via `ipcMain`.

Key risk: BroadcastChannel may not propagate between separate BrowserWindow processes. Verify first; if broken, add an IPC relay in `electron/main.ts`.

## Read

- `package.json` — current scripts and dependencies
- `vite.config.ts` — current Vite config (port 3000, aliases)
- `tsconfig.json` — TypeScript config (must add separate tsconfig for electron main process)
- `src/App.tsx` — window detection via `?view=board` URL param (board detection must still work)
- `src/hooks/useBroadcast.ts` — BroadcastChannel logic (must work unchanged in Electron)
- `src/components/operator/OperatorPanel.tsx` — has "Otwórz Tablicę w Nowym Oknie" button using `window.open()` (keep working in Electron via shell.openExternal or BrowserWindow)

## Tasks

1. **Install Electron dependencies**
   - Add `electron` as devDependency (latest stable, e.g. `^32`)
   - Add `concurrently` as devDependency (to run Vite + Electron together)
   - Add `cross-env` as devDependency (for env variables on Windows)

2. **Create `electron/main.ts`** — minimal Electron main process
   - On app `ready`: create Operator BrowserWindow (width: 1280, height: 900)
   - In dev mode (`process.env.NODE_ENV === 'development'`): load `http://localhost:3000`
   - In production: load `dist/index.html` via `file://` protocol
   - Handle `window-all-closed` → `app.quit()` (Windows behavior)
   - Verify BroadcastChannel works: open a second BrowserWindow with `?view=board` param and test sync. Add a comment documenting the result.
   - If BroadcastChannel DOES NOT work between windows: implement IPC relay
     - `ipcMain.on('bc-relay', (event, message) => { BrowserWindow.getAllWindows().forEach(win => { if (win.webContents !== event.sender) win.webContents.send('bc-relay', message) }) })`
     - In renderer: expose via `contextBridge` in a preload script `electron/preload.ts`

3. **Create `electron/preload.ts`** (only if IPC fallback is needed)
   - Use `contextBridge.exposeInMainWorld('electronBridge', { sendRelay, onRelay })`
   - Keep it minimal — only expose what's needed for BroadcastChannel relay

4. **Create `tsconfig.electron.json`** — separate TS config for main process
   ```json
   {
     "compilerOptions": {
       "target": "ES2020",
       "module": "CommonJS",
       "moduleResolution": "node",
       "outDir": "dist-electron",
       "strict": true,
       "skipLibCheck": true,
       "esModuleInterop": true
     },
     "include": ["electron"]
   }
   ```

5. **Update `package.json` scripts**
   - Add `"electron:dev": "concurrently \"vite\" \"cross-env NODE_ENV=development electron .\""`
   - Add `"electron:build": "tsc -p tsconfig.electron.json && vite build"`
   - Add `"main": "dist-electron/main.js"` field at top level of package.json

6. **Update `vite.config.ts`** — set `server.open` to `false`
   - Electron opens its own window; we don't want the browser to auto-open

7. **Update `.gitignore`** — add `dist-electron/` if not already present

8. **If IPC fallback is needed: update `src/hooks/useBroadcast.ts`**
   - Check `window.electronBridge` and use IPC relay instead of BroadcastChannel
   - Keep BroadcastChannel as primary path (for browser dev mode), IPC as Electron fallback

## Constraints

- Do NOT modify any `src/` files unless IPC fallback requires changes to `useBroadcast.ts`
- `electron/main.ts` must be compiled to CommonJS (`"module": "CommonJS"` in tsconfig.electron.json) — Electron main process does not support ESM natively
- Do NOT use `electron-vite` framework — keep the setup simple with plain `electron` + `concurrently`
- `npm run dev` must still work for browser-based development
- All existing tests must pass (`npm test`) — Electron setup must not break Vitest
- No `any` types in TypeScript

## After implementation

- Run linter: `npm run lint`
- Run tests: `npm test`
- Manual verification steps (in Polish):
  1. Uruchom `npm run electron:dev` — sprawdź czy otwiera się natywne okno Electron z Panelem Operatora
  2. W Panelu Operatora kliknij "Otwórz Tablicę w Nowym Oknie" — sprawdź czy otwiera się drugie okno z Tablicą
  3. Przejdź przez Lobby → wybór pytań → gra
  4. Odkryj odpowiedź w Panelu Operatora — sprawdź czy Tablica aktualizuje się w czasie rzeczywistym
  5. Sprawdź czy dźwięki działają
  6. Uruchom `npm run dev` — sprawdź czy aplikacja nadal działa w przeglądarce (brak regresji)

# Current Task — US-034

## Context
US-032 set up Electron with a single Operator window. The Board window was
previously opened via `window.open()` from the renderer. This US adds an
"Open Board Window" button to LobbyScreen that opens the Board window through
Electron IPC — giving the main process full control (maximized, no duplicates,
focus-if-already-open). `contextIsolation: true` is active, so a preload script
with `contextBridge` is required to expose IPC to the renderer safely.

## Read
- `electron/main.ts` — Electron main process (create operator window, app lifecycle)
- `src/components/screens/LobbyScreen.tsx` — where the button must be added
- `package.json` — scripts and electron-builder config
- `tsconfig.electron.json` — Electron TS config (check include paths)

## Tasks

1. **Create `electron/preload.ts`**
   Expose a single API via `contextBridge`:
   ```typescript
   contextBridge.exposeInMainWorld('electronAPI', {
     openBoardWindow: () => ipcRenderer.invoke('open-board-window'),
   });
   ```

2. **Create `src/types/electron.d.ts`**
   Declare the global `window.electronAPI` type so TypeScript is happy in renderer:
   ```typescript
   interface ElectronAPI {
     openBoardWindow: () => Promise<void>;
   }
   declare global {
     interface Window {
       electronAPI?: ElectronAPI;
     }
   }
   export {};
   ```

3. **Update `electron/main.ts`**
   - Import `ipcMain` from electron
   - Register `ipcMain.handle('open-board-window', ...)` handler that:
     - Keeps a reference to the board window (`let boardWindow: BrowserWindow | null = null`)
     - If `boardWindow` exists and is not destroyed → call `boardWindow.focus()`
     - Otherwise → create a new `BrowserWindow`, load `/?view=board`, open maximized
     - Clear the reference when the board window is closed (`boardWindow.on('closed', ...)`)
   - Pass `preload: path.join(__dirname, 'preload.js')` in `webPreferences` of the Operator window

4. **Update `tsconfig.electron.json`**
   Ensure `electron/preload.ts` is included in compilation (add to `include` if needed).

5. **Update `LobbyScreen.tsx`**
   - Add an "Otwórz tablicę" button below the existing buttons
   - Button is only rendered when `window.electronAPI` is defined (not in browser mode)
   - On click: call `window.electronAPI.openBoardWindow()`
   - Style: use existing `operator-btn` class

## Constraints
- Never use `any` type
- Do not modify game logic or Zustand store
- The button must not appear in browser/Vite dev mode (guard with `window.electronAPI`)
- Board window URL: dev → `http://localhost:3000/?view=board`, prod → load `index.html` with `?view=board` query
- `contextIsolation: true` must remain — do NOT set `nodeIntegration: true`
- Keep existing `createOperatorWindow` function structure intact

## After implementation
- Run linter: `npm run lint`
- Run tests: `npm test`

### Manual verification steps (Polish)
1. Uruchom `npm run electron:dev`
2. W ekranie Lobby sprawdź że przycisk "Otwórz tablicę" jest widoczny
3. Kliknij przycisk — powinno otworzyć się drugie okno zmaksymalizowane z widokiem tablicy
4. Kliknij przycisk ponownie — drugie okno powinno dostać focus, a nie otworzyć się ponowne
5. Zamknij okno tablicy, kliknij przycisk ponownie — powinno otworzyć się nowe okno
6. Otwórz aplikację w przeglądarce (`npm run dev`) — przycisk "Otwórz tablicę" NIE powinien być widoczny

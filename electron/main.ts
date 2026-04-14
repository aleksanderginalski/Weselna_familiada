import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname is not available in ESM — derive it from import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDev = process.env.NODE_ENV === 'development';
const DEV_URL = 'http://localhost:3000';

// Tracks board window IDs — assigned at creation, before URL loads.
// More reliable than URL-based lookup which can fail during page load.
const boardWindowIds = new Set<number>();

/**
 * Finds the board window by its tracked ID among all open Electron windows.
 */
function findBoardWindow(): BrowserWindow | undefined {
  return BrowserWindow.getAllWindows().find((win) => boardWindowIds.has(win.id));
}

/**
 * Creates the Board BrowserWindow (projector view) or focuses it if already open.
 * Called via IPC from the renderer when the operator clicks "Otwórz tablicę".
 */
function openBoardWindow(): void {
  const existing = findBoardWindow();
  if (existing) {
    if (existing.isMinimized()) existing.restore();
    existing.focus();
    return;
  }

  const win = new BrowserWindow({
    title: 'Weselna Familiada — Tablica',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  boardWindowIds.add(win.id);
  win.on('closed', () => boardWindowIds.delete(win.id));

  win.maximize();

  if (isDev) {
    win.loadURL(`${DEV_URL}/?view=board`);
  } else {
    win.loadFile(path.join(__dirname, '..', 'dist', 'index.html'), {
      query: { view: 'board' },
    });
  }
}

/**
 * Creates the Operator Panel BrowserWindow.
 *
 * BroadcastChannel compatibility note:
 * As of Electron v20+, BroadcastChannel propagates between all renderer
 * processes that belong to the same session (same partition). Since both the
 * Operator window and the Board window (opened via window.open() from the
 * renderer) share the default session, BroadcastChannel messages flow between
 * them without any IPC relay. No additional bridging is required.
 */
function createOperatorWindow(): BrowserWindow {
  const win = new BrowserWindow({
    width: 1280,
    height: 900,
    title: 'Weselna Familiada — Panel Operatora',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (isDev) {
    // Retry loading until the Vite dev server is ready.
    // Electron and Vite start simultaneously via concurrently, so the first
    // load attempt may happen before the server is up.
    win.webContents.on('did-fail-load', () => {
      setTimeout(() => {
        win.loadURL(DEV_URL);
      }, 1000);
    });
    win.loadURL(DEV_URL);
  } else {
    win.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
  }

  return win;
}

app.whenReady().then(() => {
  ipcMain.handle('open-board-window', () => {
    openBoardWindow();
  });

  createOperatorWindow();
});

// Quit when all windows are closed (standard Windows/Linux behavior).
// On macOS apps typically stay active until Cmd+Q — not relevant here since
// target platform is Windows only.
app.on('window-all-closed', () => {
  app.quit();
});

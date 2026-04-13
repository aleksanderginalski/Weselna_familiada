import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname is not available in ESM — derive it from import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDev = process.env.NODE_ENV === 'development';
const DEV_URL = 'http://localhost:3000';

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
  createOperatorWindow();
});

// Quit when all windows are closed (standard Windows/Linux behavior).
// On macOS apps typically stay active until Cmd+Q — not relevant here since
// target platform is Windows only.
app.on('window-all-closed', () => {
  app.quit();
});

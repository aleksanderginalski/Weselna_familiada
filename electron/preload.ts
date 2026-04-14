import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  openBoardWindow: () => ipcRenderer.invoke('open-board-window'),
});

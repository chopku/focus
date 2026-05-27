const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('windowControls', {
  close: () => ipcRenderer.send('window-close'),
  minimize: () => ipcRenderer.send('window-minimize'),
  setCompact: () => ipcRenderer.send('window-resize-compact'),
  setCompactView: () => ipcRenderer.send('window-resize-compact-view'),
  setNormal: () => ipcRenderer.send('window-resize-normal')
});

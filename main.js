const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 310,
    height: 450,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    maximizable: false,
    fullscreenable: false,
    skipTaskbar: false,
    title: "Фокусировка",
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      backgroundThrottling: false
    }
  });

  // Load our single-file index.html
  mainWindow.loadFile('index.html');

  // Ensure window is always on top even over full screen apps
  mainWindow.setAlwaysOnTop(true, 'screen-saver');

  // Prevent flash on startup
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });
}

// Disable hardware acceleration issues with transparency on some systems
// app.disableHardwareAcceleration(); // Usually not required, let's keep it default

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// IPC event handlers for window controls
ipcMain.on('window-close', () => {
  app.quit();
});

ipcMain.on('window-minimize', () => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) win.minimize();
});

ipcMain.on('window-resize-compact', () => {
  const win = BrowserWindow.getFocusedWindow() || BrowserWindow.getAllWindows()[0];
  if (win) {
    win.setSize(310, 150);
  }
});

ipcMain.on('window-resize-compact-view', () => {
  const win = BrowserWindow.getFocusedWindow() || BrowserWindow.getAllWindows()[0];
  if (win) {
    win.setSize(310, 280);
  }
});

ipcMain.on('window-resize-normal', () => {
  const win = BrowserWindow.getFocusedWindow() || BrowserWindow.getAllWindows()[0];
  if (win) {
    win.setSize(310, 450);
  }
});

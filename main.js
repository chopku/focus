const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 310,
    height: 450,
    minWidth: 310,
    maxWidth: 310,
    minHeight: 450,
    maxHeight: 450,
    frame: false,
    transparent: true,
    hasShadow: false,
    alwaysOnTop: true,
    resizable: true,
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
    if (mainWindow) mainWindow.show();
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
  if (mainWindow) {
    mainWindow.minimize();
  }
});

function resizeWindow(width, height) {
  if (mainWindow) {
    mainWindow.setMinimumSize(width, height);
    mainWindow.setMaximumSize(width, height);
    mainWindow.setSize(width, height);
  }
}

ipcMain.on('window-resize-compact', () => {
  resizeWindow(310, 175);
});

ipcMain.on('window-resize-compact-view', () => {
  resizeWindow(310, 290);
});

ipcMain.on('window-resize-normal', () => {
  resizeWindow(310, 450);
});

ipcMain.on('window-resize-expanded', () => {
  resizeWindow(310, 580);
});




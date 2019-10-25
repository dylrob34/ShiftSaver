const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    }
  });

  // and load the index.html of the app.
  win.loadFile("build/index.html");

  //win.webContents.openDevTools();

  win.on('closed', function() {
    win = null
  });

}

app.on('ready', createWindow);

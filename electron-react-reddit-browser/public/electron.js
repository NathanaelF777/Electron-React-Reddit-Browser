const { app, BrowserWindow } = require('electron')
const electron = require('electron')
const path = require("path")
const isDev = require("electron-is-dev")
const ipcMain = electron.ipcMain

let win;
let showWin

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  showWin = new BrowserWindow({
    width: 600,
    height: 600,
    parent: win,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  win.loadURL(
    isDev ? 'http://localhost:3000?viewA' : `file://${path.join(__dirname, "../build/index.html?viewA")}`
  )
  showWin.loadURL(
    isDev ? 'http://localhost:3000?viewB' : `file://${path.join(__dirname, "../build/index.html?viewB")}`
  )

  showWin.on('close', (e) => {
    e.preventDefault()
    showWin.hide()
  })

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

ipcMain.on('toggle-show', (event, arg) => {
  showWin.show()
  showWin.webContents.send('image', arg)
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

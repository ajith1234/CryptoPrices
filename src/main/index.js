import { app, BrowserWindow, ipcMain, ipcRenderer } from 'electron'


/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow = null
let dataWindow = null
global.config = {
    apiKey: "AIzaSyBrrG8hM8wgvGXxtK7hDlmNBk_Ts-HjS9U",
    authDomain: "fyp-cryptoprices.firebaseapp.com",
    databaseURL: "https://fyp-cryptoprices.firebaseio.com",
    projectId: "fyp-cryptoprices",
    storageBucket: "fyp-cryptoprices.appspot.com",
    messagingSenderId: "821627309596"
}

//sets the 
const winURL = process.env.NODE_ENV === 'development' ?
    `http://localhost:9080` :
    `file://${__dirname}/index.html`

const dataURL = process.env.NODE_ENV === 'development' ?
    `http://localhost:9080/data.html` :
    `file://${__dirname}/data.html`

function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
            'minHeight': 600,
            useContentSize: true,
            'minWidth': 800,
            frame: false
        })
        /**
         * Data window options
         */
    dataWindow = new BrowserWindow({
        'minHeight': 600,
        useContentSize: true,
        'minWidth': 800,
        frame: false,
        show: false
    })

    //Loads the pages to each browser window
    dataWindow.loadURL(dataURL)
    mainWindow.loadURL(winURL)



    // closes app when the main window is closed
    mainWindow.on('closed', () => {
        mainWindow = null
        dataWindow = null
    })

}

//When the app is ready the createWindow function is passed to electron
app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null && dataWindow === null) {
        createWindow()

    }
})


// Coin Data IPC Methods
ipcMain.on('get-coins-main', (event) => {
    dataWindow.webContents.send("get-coin-data")
})

ipcMain.on('send-coin-data', (event, data) => {
    mainWindow.webContents.send('set-data', data)
})

// Login IPC Methods

ipcMain.on("send-login", (event, data) => {
    console.log("main sending to data process")
    console.log(data)
    dataWindow.webContents.send("Login", data)
})

ipcMain.on('logged-in', (event) => {
    console.log("main process calling set-auth...");
    //console.log(user)
    mainWindow.send("set-auth")
})

// Logout IPC Methods
ipcMain.on('logout', (event) => {
    console.log("Loggingout user...");
    dataWindow.send("logout")
})


// Register IPC Methods
ipcMain.on("registerUser", (event, data) => {
    console.log(data)
    dataWindow.send("SignUp", data)
})

// OnError
ipcMain.on("auth-error", (event, error) => {
    mainWindow.send("alertError", error)
})

//Set user data
ipcMain.on("send-user-data", (event, data) => {
    console.log("send-user-data")
    console.log(data)
    mainWindow.send("set-user", data)
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
import { app, BrowserWindow, ipcMain } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow = null
let dataWindow = null

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
        frame: false
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

// test Method
ipcMain.on('txt', (event, data) => {
    dataWindow.webContents.send('txt', data)
})

//Config for the data base
ipcMain.on('get-config', (event, config) => {
    dataWindow.webContents.send('send-config', config)
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
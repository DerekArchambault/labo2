import {app, BrowserWindow, nativeImage, Tray} from 'electron'
import path from 'path'

let win: BrowserWindow | null = null
let childWindow: BrowserWindow | null = null


const createWindow = () => {
    win = new BrowserWindow({
            width: 1000,
            height: 700,

            minWidth: 800,
            minHeight: 600,

            resizable: true,

            transparent: false,

            frame: true,

            backgroundColor: "rgba(33, 212, 182, 0.33)",

            icon: path.join(__dirname, 'assets/taskBox.ico'),

            title: "TaskBox - Accueil"
        })

        // Afficher une icône dans la zone de notifications
        const iconPath = path.join(__dirname, '../../dist/assets/taskBox.ico')
        const trayIcon = nativeImage.createFromPath(iconPath)
        const tray = new Tray(trayIcon)
        tray.setToolTip("TEST")

        // Charger le fichier HTML dans la fenêtre créée
        win.loadFile(path.join(__dirname, "../../src/renderer/index.html"))
    }

// Lorsque l'environnement est prêt
app.whenReady().then(() => {
    
    const splash = new BrowserWindow(
        {
            width: 400,
            height: 300,
            frame: false,
            transparent: true,
            alwaysOnTop: true,
            resizable: false,
            center: true
        }
    )

    splash.loadFile(path.join(__dirname, '../../src/renderer/splash.html'))

    setTimeout(() => {
        splash.close()
        createWindow()

        // Fenêtre enfant modulaire
        if (win) {
            childWindow = new BrowserWindow({
                width: 400,
                height: 300,
                title: 'Fenêtre enfant',
                parent: win,
                modal: true,
                webPreferences: {
                    nodeIntegration: true,
                }
                
            })

            childWindow.loadFile(path.join(__dirname, '../../src/renderer/about.html'))
        }
    }, 3000)

})
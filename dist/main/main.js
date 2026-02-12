"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
let win = null;
let childWindow = null;
const createWindow = () => {
    win = new electron_1.BrowserWindow({
        width: 1000,
        height: 700,
        minWidth: 800,
        minHeight: 600,
        resizable: true,
        transparent: false,
        frame: true,
        backgroundColor: "rgba(33, 212, 182, 0.33)",
        icon: path_1.default.join(__dirname, 'assets/taskBox.ico'),
        title: "TaskBox - Accueil"
    });
    // Afficher une icône dans la zone de notifications
    const iconPath = path_1.default.join(__dirname, '../../dist/assets/taskBox.ico');
    const trayIcon = electron_1.nativeImage.createFromPath(iconPath);
    const tray = new electron_1.Tray(trayIcon);
    tray.setToolTip("TEST");
    // Charger le fichier HTML dans la fenêtre créée
    win.loadFile(path_1.default.join(__dirname, "../../src/renderer/index.html"));
};
// Lorsque l'environnement est prêt
electron_1.app.whenReady().then(() => {
    const splash = new electron_1.BrowserWindow({
        width: 400,
        height: 300,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        resizable: false,
        center: true
    });
    splash.loadFile(path_1.default.join(__dirname, '../../src/renderer/splash.html'));
    setTimeout(() => {
        splash.close();
        createWindow();
        // Fenêtre enfant modulaire
        if (win) {
            childWindow = new electron_1.BrowserWindow({
                width: 400,
                height: 300,
                title: 'Fenêtre enfant',
                parent: win,
                modal: true,
                webPreferences: {
                    nodeIntegration: true,
                }
            });
            childWindow.loadFile(path_1.default.join(__dirname, '../../src/renderer/about.html'));
        }
    }, 3000);
});

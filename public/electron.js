const { ipcMain } = require('electron');
const electron = require('electron');
const app = electron.app;
const Menu = electron.Menu;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const db = require('./db');

let mainWindow;

function createWindow() {

    mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        resizable: false,
        icon: path.join(__dirname, '/icon.png'),
        webPreferences: {
            preload: './db.js',
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            contextIsolation: false
        }
    });

    if (process.env.NODE_ENV === 'dev') {
        mainWindow.loadURL('http://localhost:3000');
    } else {
        mainWindow.loadURL('file:///' + __dirname + "/index.html");
    }

    // mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function () {
        mainWindow = null
    })
}


app.on('ready', () => {
    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);

    createWindow();
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
});



const menuTemplate = [
    {
        label: 'Editar',
        submenu: [
            {
                label: 'Copiar',
                accelerator: 'CommandOrControl+C',
                role: 'copy',
            },
            {
                label: 'Colar',
                accelerator: 'CommandOrControl+V',
                role: 'paste',
            },
        ]
    },
    {
        label: 'Visualizar',
        submenu: [
            {
                label: 'Recarregar',
                accelerator: 'CommandOrControl+shift+R',
                role: 'forceReload'
            },
            {
                label: 'Inspecionar',
                accelerator: 'CommandOrControl+shift+i',
                role: 'toggleDevTools'
            }
        ]
    },
    {
        label: 'Ajuda',
        submenu: [
            {
                label: 'contato: (31) 98715-4159'
            }
        ]
    }
];

ipcMain.handle('database:insert', async (event, arg) => {
    const { schema, data } = arg;
    let result;
    switch (schema) {
        case 'transactions':
            result = await db.transactions.insert({
                data
            });
            break;
        default:
            break;
    }

    return result;
})

ipcMain.handle('database:fetch', async (event, arg) => {
    const { schema } = arg;
    let result;
    switch (schema) {
        case 'transactions':
            result = await db.transactions.find({}).sort({ createdAt: -1 })
            break;
        default:
            break;
    }

    return result;
})

ipcMain.handle('database:exclude', async (event, arg) => {
    const { schema, data } = arg;
    let result;
    switch (schema) {
        case 'transactions':
            result = await db.transactions.remove({ _id: data.id })
            break;
        default:
            break;
    }
    return result;
})

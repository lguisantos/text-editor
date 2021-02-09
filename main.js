const { app, BrowserWindow, Menu } = require("electron");

var mainWindow = null;
//Janela principal
async function createWindow() {
  let indexMainFile = `${__dirname}/src/pages/editor/index.html`;
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  await mainWindow.loadURL(indexMainFile);
  // mainWindow.webContents.openDevTools();

  createNewFile()
}

var file = {};
//criar novo arquivo
function createNewFile() {
  file = {
    name: "newFile.txt",
    content: "",
    saved: false,
    path: app.getPath("documents") + "/newFile.txt",
  };

  mainWindow.webContents.send("set-file", file);
}

//template menu
//podemos criar menus e submenus
const templateMenu = [
  {
    label: "Arquivo",
    submenu: [
      {
        label: "Novo",
        submenu: [
          {
            label: "File",
            click() {
              createNewFile();
            },
          },
        ],
      },
      {
        label: "Abrir",
      },
      {
        label: "Salvar",
      },
      {
        label: "Salvar como...",
      },
      {
        label: "Sair",
        role: "quit",
      },
    ],
  },
];

//Menu
const menu = Menu.buildFromTemplate(templateMenu);
Menu.setApplicationMenu(menu);

app.whenReady().then(createWindow);

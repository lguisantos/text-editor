const { app, BrowserWindow, Menu } = require("electron");

//Janela principal
async function createWindow() {
  let mainWindow = null;
  let indexMainFile = `${__dirname}/src/pages/editor/index.html`;
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  await mainWindow.loadURL(indexMainFile);
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
        label: 'Sair',
        role:'quit'
      }
    ],
  },
];

//Menu
const menu = Menu.buildFromTemplate(templateMenu);
Menu.setApplicationMenu(menu);

app.whenReady().then(createWindow);

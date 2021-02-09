const { app, BrowserWindow, Menu, dialog, ipcMain } = require("electron");
const fs = require("fs");
const path = require("path");
const { resourceUsage } = require("process");

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

  createNewFile();

  ipcMain.on("update-content", (event, data) => {
    file.content = data;
  });
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

async function saveFile(filePath) {
  try {
    fs.writeFileSync(filePath, file.content, (error) => {
      if (error) throw error;
      file.saved = true;
      file.path = filePath;
      file.name = path.basename(filePath);

      //Chamando o evento outra vez para atualizar o nome na janela do app
      mainWindow.webContents.send("set-file", file);
    });
  } catch (error) {
    console.log(error);
  }
}

async function saveFileAs() {
  let dialogFile = await dialog.showSaveDialog({
    defaultPath: file.path,
  });

  if (dialogFile.canceled) {
    return;
  }
  saveFile(dialogFile.filePath);
}

function justSaveFile() {
  debugger
  if (file.saved) {
    return saveFile(file.path);
  }

  //salvar como
  return saveFileAs();
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
        click() {
          justSaveFile();
        },
      },
      {
        label: "Salvar como...",
        click() {
          saveFileAs();
        },
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

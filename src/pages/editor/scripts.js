const { ipcRenderer } = require("electron");

const title = document.getElementById("title")
const textarea = document.getElementById("textEditor")

// chamando evendo set-file criado no main.js
ipcRenderer.on("set-file", function (event, data) {
    title.innerHTML = `${data.name} | WDEV Editor`
    textarea.value = data.content
});

//Atualizando textarea
function handleChangeText(){
    ipcRenderer.send('update-content', textarea.value)
}
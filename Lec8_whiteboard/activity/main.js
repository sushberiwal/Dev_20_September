// in excel clone/activity 
// npm init -y
// npm install --save-dev electron
// add this in package.json "start" : "electron ."

// const electron = require('electron');
const electron = require('electron')

const {app,BrowserWindow} = electron;


function createWindow () {
    // Create the browser window.
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true, // nodejs is enabled in the browser ,
        enableRemoteModule:true
      }
    })
  
    // and load the index.html of the app.
    win.loadFile('index.html').then(function(){
        win.maximize();
        win.removeMenu();
    })
    
  }
  
app.whenReady().then(createWindow)


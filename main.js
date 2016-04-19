// electron startup script
'use strict';

const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
// check for dev mode
const devMode = process.argv[2] == '-dev' ? true : false;
// module for getting user input
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;

/**
 * create electron window
 */
function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1200, height: 900});

  // and load the index.html of the app.
  // (if dev mode is on, load ionic livereload URL)
  let url = devMode 
    ? 'http://localhost:8100'
    : 'file://' + __dirname + '/www/index-electron.html';

  // load window
  mainWindow.loadURL(url);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

/**
 * prompt user to terminate app
 */
function rlClose() {
  rl.question("Enter 'q' to terminate app: ", (answer) => {
    if (answer.toLowerCase() == 'q') {
      rl.close();
      process.exit(0);
    }
    else rlClose()
  });
}

/**
 * Init script
 */
function init() {

  if (devMode) {
    console.log('\u001b[31m=== dev mode enabled ===\u001b[0m');

    const spawn = require('child_process').spawn;
    const ionic = spawn('ionic', ['serve', '-b']);

    ionic.stdout.on('data', (data) => {
      // check if ionic is asking for input
      if (data.toString().trim().indexOf('ionic $') > -1) {
        // check if anything else has logged
        let logs = data.toString().split('\n');
        for (var i = 0; i < logs.length - 1; i++) console.log(logs[i]);

        // create window if it doesn't exist
        if (mainWindow === null) createWindow();

        // get input for ionic
        rl.question('ionic $ ', (answer) => {
          ionic.stdin.write(answer+'\n');
          rl.pause();
        });
      }
      else console.log(data.toString().trim());
    });

    ionic.stderr.on('data', (data) => {
      console.log(`\u001b[32mionic error: ${data}\u001b[0m`);
    });

    ionic.on('close', (code) => {
      console.log(`\u001b[32mionic exited with code ${code}\u001b[0m`);
      // prompt user to quit app
      rl.question('Do you want to quit? [Y/n] ', (ans) => {
        if (!ans || ans.toLowerCase() == 'y') { rl.close(); process.exit(0); }
        else rlClose();
      });
    });
  }
  else {
    console.log('\u001b[33m Running app :)');
    // create window if it doesn't exist
    if (mainWindow === null) createWindow();
    // prompt user to close app
    rlClose();
  }

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', init);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
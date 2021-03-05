const {app, BrowserWindow, dialog} = require('electron');
const path = require('path');
const url = require('url');
const log = require('electron-log');
const {autoUpdater} = require("electron-updater");

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');


global.gApp = {
	name: "Eba",
	author: "Ali Güçlü (Mirarus) <aliguclutr@gmail.com>",
	repo: "mirarus/eba",
	sendLog: sendLog
};

function sendLog(text) {
	log.info(text);
	dialog.showMessageBox({
		type: "info",
		title: gApp.name,
		message: text,
	});
}

function createWindow() {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		minHeight: 480, 
		minWidth: 360,
		frame: false,
		title: gApp.name,
		icon: path.join(__dirname, '../icons/icon.ico'),
		webPreferences: {
			contextIsolation: true,
			nodeIntegration: true,
			enableRemoteModule: true,
			preload: path.join(__dirname, 'preload.js')
		}
	});
	win.loadURL("https://eba.gov.tr");
}

app.whenReady().then(() => {
	createWindow();

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});

	autoUpdater.checkForUpdatesAndNotify();
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});


// autoUpdater
autoUpdater.on('checking-for-update', () => {
	sendLog('Checking for update...');
})
autoUpdater.on('update-available', (info) => {
	sendLog('Update available.');
})
autoUpdater.on('update-not-available', (info) => {
	sendLog('Update not available.');
})
autoUpdater.on('error', (err) => {
	sendLog('Error in auto-updater. ' + err);
})
autoUpdater.on('download-progress', (progressObj) => {
	let log_message = "Download speed: " + progressObj.bytesPerSecond;
	log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
	log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
	sendLog(log_message);
})
autoUpdater.on('update-downloaded', (ev, info) => {
	sendLog('Update downloaded');

	setTimeout(function() {
		autoUpdater.quitAndInstall();  
	}, 5000)
})
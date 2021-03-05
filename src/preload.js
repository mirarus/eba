const path = require('path');
const url = require('url');
const {app, getGlobal, Menu, MenuItem} = require('electron').remote;
const titlebar = require('custom-electron-titlebar');
const menu = new Menu();

menu.append(new MenuItem({
	label: getGlobal('gApp').name,
	submenu: [
	{
		label: 'About',
		click: () => {
			getGlobal('gApp').sendLog("Author: " + getGlobal('gApp').author + "\nVersion: " + app.getVersion());
		}
	}, 
	{
		type: 'separator'
	}, 
	{
		label: 'Çıkış - Quit',
		accelerator: (function() {
			if (process.platform == 'darwin') {
				return 'Command+Q';
			} else {
				return 'Ctrl+Q';
			}
		})(),
		click: () => app.quit()
	}
	]
}));

window.addEventListener('DOMContentLoaded', () => {
	new titlebar.Titlebar({
		backgroundColor: titlebar.Color.fromHex('#2f3241'),
		menu: menu
	});
});
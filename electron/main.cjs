const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { autoUpdater } = require("electron-updater");

let store;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      preload: path.join(__dirname, "preload.cjs"),
    },
  });

  const indexPath = path.join(app.getAppPath(), "dist", "index.html");
  win.loadFile(indexPath);
}

app.whenReady().then(async () => {
  const StoreModule = await import("electron-store");
  const Store = StoreModule.default;
  store = new Store();

  ipcMain.handle("settings:getBackendUrl", () => {
    return store.get("backendUrl") || "";
  });

  ipcMain.handle("settings:setBackendUrl", (_, url) => {
    store.set("backendUrl", url);
  });

  ipcMain.handle("app:getVersion", () => {
    return app.getVersion();
  });

  ipcMain.handle("app:checkForUpdates", async () => {
    try {
      const result = await autoUpdater.checkForUpdates();
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  });

  ipcMain.handle("app:installUpdate", () => {
    autoUpdater.quitAndInstall();
  });

  createWindow();

  autoUpdater.checkForUpdatesAndNotify().catch(console.error);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

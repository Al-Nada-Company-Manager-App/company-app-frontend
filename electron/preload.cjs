const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("companyManager", {
  getBackendUrl: () => ipcRenderer.invoke("settings:getBackendUrl"),
  setBackendUrl: (url) => ipcRenderer.invoke("settings:setBackendUrl", url),
  getAppVersion: () => ipcRenderer.invoke("app:getVersion"),
  checkForUpdates: () => ipcRenderer.invoke("app:checkForUpdates"),
  downloadUpdate: () => ipcRenderer.invoke("app:downloadUpdate"),
  installUpdate: () => ipcRenderer.invoke("app:installUpdate"),
  onUpdateProgress: (callback) => ipcRenderer.on("updater:progress", (_, progressObj) => callback(progressObj)),
  onUpdateDownloaded: (callback) => ipcRenderer.on("updater:downloaded", () => callback()),
});

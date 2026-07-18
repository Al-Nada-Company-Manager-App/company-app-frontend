const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("companyManager", {
  getBackendUrl: () => ipcRenderer.invoke("settings:getBackendUrl"),
  setBackendUrl: (url) => ipcRenderer.invoke("settings:setBackendUrl", url),
  getAppVersion: () => ipcRenderer.invoke("app:getVersion"),
  checkForUpdates: () => ipcRenderer.invoke("app:checkForUpdates"),
  installUpdate: () => ipcRenderer.invoke("app:installUpdate"),
});

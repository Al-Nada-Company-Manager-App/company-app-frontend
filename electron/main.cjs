const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    autoHideMenuBar: true,
    webPreferences: {
      webSecurity: false, // Required to allow cross-origin cookies from file://
    },
  });

  // Spoof the Origin header to match the backend's allowed origin
  win.webContents.session.webRequest.onBeforeSendHeaders(
    (details, callback) => {
      callback({
        requestHeaders: {
          ...details.requestHeaders,
          Origin: "http://localhost:5173",
        },
      });
    },
  );

  // Strip SameSite and Secure attributes to allow setting cookies in file:// context
  win.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    if (details.responseHeaders && details.responseHeaders["set-cookie"]) {
      details.responseHeaders["set-cookie"] = details.responseHeaders[
        "set-cookie"
      ].map((cookie) => {
        return cookie
          .replace(/; ?SameSite=[^;]*/i, "; SameSite=None")
          .replace(/; ?Secure/i, "");
      });
    }
    callback({ responseHeaders: details.responseHeaders });
  });

  const indexPath = path.join(app.getAppPath(), "dist", "index.html");

  win.loadFile(indexPath);
}

app.whenReady().then(createWindow);

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

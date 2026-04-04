"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("icms", {
  platform: process.platform
});

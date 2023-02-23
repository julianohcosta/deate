const path = require("path");
const fs = require("fs");
const AdmZip = require("adm-zip");

const FOLDER_NAME = "build";

class FlatBuild {
  constructor() {
    this.buildFolder = path.join(__dirname, FOLDER_NAME);
    this.staticFolder = path.join(this.buildFolder, "static");
  }

  zipBuildFolder() {
    const zip = new AdmZip();
    const buildFiles = fs.readdirSync(this.buildFolder);
    buildFiles.forEach((file) => {
      const filePath = path.join(this.buildFolder, file);
      zip.addLocalFile(filePath);
    });
    zip.writeZip("APP.zip");
  }

  replaceIndexHtml() {
    const planIndexText = fs
      .readFileSync(path.join(this.buildFolder, "index.html"), "utf8")
      .replace("/static/js/", "")
      .replace("/static/css/", "")
      .replace("/favicon.ico", "favicon.ico");

    fs.writeFileSync(path.join(this.buildFolder, "index.html"), planIndexText);
  }

  removeStaticFolder() {
    fs.rm(this.staticFolder, { recursive: true }, (err) => {
      if (err) console.log(err);
      else this.zipBuildFolder();
    });
  }
  getCurrentFilePath(file) {
    let currentFile;
    if (file.includes("css")) {
      currentFile = path.join(this.staticFolder, "css", file);
    } else if (file.includes("js")) {
      currentFile = path.join(this.staticFolder, "js", file);
    }
    return currentFile;
  }

  moveFilesFromStaticFolderToBuildFolder(filesList) {
    filesList.forEach((file) => {
      const currentFile = this.getCurrentFilePath(file);
      const destination = path.join(this.buildFolder, file);
      fs.rename(currentFile, destination, (err) => {
        if (err) console.log(err);
        else console.log("File successfully moved");
      });
    });
  }

  getStaticFilesList() {
    const staticFiles = [];
    fs.readdirSync(this.staticFolder).forEach((subfolder) => {
      const filePath = path.join(this.staticFolder, subfolder);
      fs.readdirSync(filePath).forEach((file) => staticFiles.push(file));
    });
    return staticFiles;
  }

  async flat() {
    const staticFiles = this.getStaticFilesList();

    const p1 = new Promise((resolve, reject) => {
      resolve(this.moveFilesFromStaticFolderToBuildFolder(staticFiles));
    });
    const p2 = new Promise((resolve, reject) => {
      resolve(this.replaceIndexHtml());
    });
    const p3 = new Promise((resolve, reject) => {
      resolve(this.removeStaticFolder());
    });

    Promise.all([p1, p2, p3]);
  }
}

const Flat = new FlatBuild();
Flat.flat();

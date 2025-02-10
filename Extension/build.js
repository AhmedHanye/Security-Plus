import { execSync } from "child_process";
import path from "path";
import { exit } from "process";
import { fileURLToPath } from "url";
import { promises as fs } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const excludedFilesDirs = ["manifest.json", "e-icons","ruleset.json"];

// Main function to orchestrate the build and copy process
const main = () => {
  try {
    processDirectory(path.join(__dirname, "background"));
    processDirectory(path.join(__dirname, "pages"));
  } catch (e) {
    console.log(e);
    exit(1);
  }
};

// Function to copy files and directories recursively
const copyFilesAndDirs = async (sourceDir, targetDir) => {
  const files = await fs.readdir(sourceDir);
  for (const file of files) {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);
    const stat = await fs.stat(sourcePath);
    if (stat.isFile()) {
      await fs.copyFile(sourcePath, targetPath);
    } else if (stat.isDirectory()) {
      await fs.mkdir(targetPath, { recursive: true });
      await copyFilesAndDirs(sourcePath, targetPath); // Recursive call
    }
  }
};

// Function to remove files and directories, excluding specified ones
const removeFilesAndDirs = async (dir) => {
  const files = await fs.readdir(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (excludedFilesDirs.includes(file)) {
      continue;
    }
    try {
      await fs.rm(filePath, { recursive: true, force: true });
      console.log(`Removed ${filePath}`);
    } catch (err) {
      console.error(`Error removing ${filePath}: ${err}`);
    }
  }
};

// Function to process a directory: clean, build, and copy files
const processDirectory = async (dir) => {
  const chromiumDir = path.join(__dirname, "chromium");
  const firefoxDir = path.join(__dirname, "firefox");
  // Clean old build
  await removeFilesAndDirs(chromiumDir);
  await removeFilesAndDirs(firefoxDir);
  // Create new build
  execSync("pnpm install", { cwd: dir, stdio: "inherit" });
  execSync("pnpm build", { cwd: dir, stdio: "inherit" });
  const distDir = path.join(dir, "dist");
  await copyFilesAndDirs(distDir, chromiumDir);
  await copyFilesAndDirs(distDir, firefoxDir);
};

main();

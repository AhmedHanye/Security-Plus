import { readdir, readFile } from "fs/promises";
import path from "path";

const readJsonFile = async (filePath: string): Promise<jsonFile> => {
  try {
    const fileContent = await readFile(
      path.join(process.cwd(), filePath),
      "utf-8",
    );
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading json file:", error);
    return {};
  }
};

const getDownloadLinks = async (): Promise<DownloadLinks> =>
  (await readJsonFile("src/download.json")) as DownloadLinks;

const getVersionData = async (version: string): Promise<jsonFile> => {
  // ! if no version provided use latest version
  if (!version) {
    const versions = await versionNames();
    if (versions.length === 0) return {};
    return getVersionData(versions[versions.length - 1]);
  }
  return await readJsonFile(`src/data/${version}.json`);
};

const versionNames = async (): Promise<string[]> => {
  try {
    const files = await readdir(path.join(process.cwd(), "src/data"));
    return files.map((file) => file.replace(".json", "")).sort();
  } catch (error) {
    console.error("Error reading version files:", error);
    return [];
  }
};

export { versionNames, getVersionData, getDownloadLinks };

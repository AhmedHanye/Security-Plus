import { readdir, readFile } from "fs/promises";
import path from "path";

const versionNames = async (): Promise<string[]> => {
  try {
    const dataPath = path.join(process.cwd(), "src/data");
    const files = await readdir(dataPath);
    await slowTime(3000);
    return files.map((file) => file.replace(".json", "")).sort();
  } catch (error) {
    console.error("Error reading version files:", error);
    return [];
  }
};

const getVersionData = async (
  version: string
): Promise<Record<string, unknown>> => {
  try {
    // ! if no version provided use latest version
    if (!version) {
      const versions = await versionNames();
      return getVersionData(versions[versions.length - 1]);
    }
    const dataPath = path.join(process.cwd(), "src/data", `${version}.json`);
    const fileContent = await readFile(dataPath, "utf-8");
    await slowTime(3000);

    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading version data:", error);
    return {};
  }
};

const slowTime = async (time: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export { versionNames, getVersionData };

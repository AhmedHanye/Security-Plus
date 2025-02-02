import { readdir, readFile } from "fs/promises";
import path from "path";


const versionNames = async (): Promise<string[]> => {
  try {
    const dataPath = path.join(process.cwd(), "src/data");
    const files = await readdir(dataPath);

    // Filter .json files and remove extension
    const jsonFiles = files
      .filter((file) => file.endsWith(".json"))
      .map((file) => file.replace(".json", ""));

    await slowTime(3000);

    return jsonFiles.sort();
  } catch (error) {
    console.error("Error reading version files:", error);
    return [];
  }
};

const getVersionData = async (
  version: string
): Promise<Record<string, unknown>> => {
  try {
    if (!version) return {};
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

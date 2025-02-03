"use server"
import { getDownloadLinks } from "@/lib/data";

const DownloadData = async () => {
  const downloadLinks = await getDownloadLinks();
  return (
    <>
      {Object.keys(downloadLinks).map((version) => (
        <div key={version}>
          <h3 className="text-xl font-bold py-2">{version}</h3>
          <ul className="text-blue-600">
            {Object.keys(downloadLinks[version]).map((link) => (
              <li key={link} className="break-all py-0.5">
                <a href={downloadLinks[version][link]}>{link}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default DownloadData;

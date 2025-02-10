import { getDownloadLinks } from "@/lib/data";

const DownloadData = async () => {
  const downloadLinks: DownloadLinks = await getDownloadLinks();
  return (
    <>
      {Object.keys(downloadLinks).length > 0 ? (
        Object.keys(downloadLinks).map((version: string) => (
          <div key={version}>
            <h3 className="py-2 text-xl font-bold">{version}</h3>
            <ul className="text-blue-600">
              {Object.keys(downloadLinks[version]).map((link: string) => (
                <li key={link} className="break-all py-0.5">
                  <a href={downloadLinks[version][link]}>{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p className="text-center text-xl font-black text-orange-600">
          Unable to fetch download links. Please try again later.
        </p>
      )}
    </>
  );
};

export default DownloadData;

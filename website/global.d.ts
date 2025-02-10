type jsonFile = Record<string, unknown>;

type DownloadLinks = {
  [key: string]: {
    [key: string]: string;
  };
};

interface PageProps {
  searchParams: Promise<{ version?: string }>;
}
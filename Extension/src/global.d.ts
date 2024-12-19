type theme = "light" | "dark" | "system" | undefined;
type Links = {
  id: number;
  url: string;
  status: "Allowed" | "Blocked";
  type: "Page" | "Domain";
};

type rule = {
  domain?: string;
  url?: string;
  status?: string;
};
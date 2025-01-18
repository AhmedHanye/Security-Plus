type Theme = "light" | "dark" | "system";
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
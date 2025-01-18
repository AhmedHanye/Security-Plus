export const virusTotalUrl = (url: string) => {
  return (
    "https://www.virustotal.com/gui/search/" +
    encodeURIComponent(encodeURIComponent(url))
  );
};

export const whoIsUrl = (url: string) => {
  const whoisPlus = () => {
    try {
      return new URL(url).hostname;
    } catch {
      // ! if the url is not valid, return the url as it is
      return encodeURIComponent(encodeURIComponent(url));
    }
  };
  return "https://who.is/whois/" + whoisPlus();
};

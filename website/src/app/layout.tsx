import localFont from "next/font/local";
import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security Plus",
  description:
    "Security Plus is a browser extension that adds an extra layer of security to your browsing experience. It intercepts page loads and provides detailed security analysis using VirusTotal and WhoIs before allowing access.",
};

const sourceSansPro = localFont({
  src: [
    {
      path: "../../public/source-sans-pro/SourceSansPro-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/source-sans-pro/SourceSansPro-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/source-sans-pro/SourceSansPro-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-source-sans-pro",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link
          rel="icon"
          type="image/png"
          href="icons/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="icons/favicon.svg" />
        <link rel="shortcut icon" href="icons/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="icons/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="Security Plus" />
        <link rel="manifest" href="icons/site.webmanifest" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Security Plus" />
        <meta property="og:site_name" content="Security Plus" />
        <meta
          property="og:description"
          content="Security Plus is a browser extension that adds an extra layer of security to your browsing experience."
        />
        <meta
          property="og:image"
          content="https://securityplus.com/icons/apple-touch-icon.png"
        />
        <meta property="og:url" content="https://securityplus.com" />
        <meta property="og:type" content="website" />
      </head>
      <body className={`${sourceSansPro.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

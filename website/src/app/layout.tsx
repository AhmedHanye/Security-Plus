import localFont from "next/font/local";
import "./globals.css";

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

// TODO: remove react-scan script

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
        <script src="https://unpkg.com/react-scan/dist/auto.global.js" async />
      </head>
      <body className={`${sourceSansPro.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

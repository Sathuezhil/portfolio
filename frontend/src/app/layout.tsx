import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ezhilsathu-portfolio.netlify.app";

export const metadata: Metadata = {
  title: "Sathuryan Ezhilarasi — Software Engineer",
  description:
    "Frontend engineer in Dubai building responsive web applications with React, Next.js, TypeScript, Laravel, and modern UI systems.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Sathuryan Ezhilarasi · Frontend Engineer · Dubai",
    description:
      "Frontend engineer in Dubai. I design ERP, POS, and Next.js product interfaces for teams in Germany, Sri Lanka, and the UAE.",
    type: "website",
    url: "/",
    siteName: "Sathuryan Ezhilarasi",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sathuryan Ezhilarasi · Frontend Engineer · Dubai",
    description:
      "Frontend engineer in Dubai building ERP, POS, and Next.js product interfaces.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrument.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem("theme");var t=s==="light"||s==="dark"?s:(window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`,
          }}
        />
      </head>
      <body className="min-h-full bg-bg text-ink">{children}</body>
    </html>
  );
}

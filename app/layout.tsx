import type { Metadata } from "next";
import { sitePath } from "./site-path";
import "./globals.css";

const title = "Hair Unlimited of Denver | Private Custom Hair Replacement";
const description =
  "Private, custom non-surgical hair systems in Denver. Natural results, precise fit and one-to-one care since 1989.";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hair-unlimited-denver.ashlow.chatgpt.site/";
const ogImage = new URL("og.png", siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`).toString();

export const metadata: Metadata = {
  title,
  description,
  icons: {
    icon: [{ url: sitePath("/hu-lettermark-gothic-final.svg"), type: "image/svg+xml" }],
    shortcut: sitePath("/hu-lettermark-gothic-final.svg"),
  },
  openGraph: {
    title,
    description,
    type: "website",
    images: [{ url: ogImage, width: 1729, height: 910, alt: "Hair Unlimited. Look like yourself again." }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

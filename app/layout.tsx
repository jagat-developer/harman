import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.harman.homes"),
  title: {
    default: "Harman Homes Blog | Brampton & GTA Real Estate Insights",
    template: "%s | Harman Homes"
  },
  description:
    "Real estate market guides, buyer and seller strategy, and Brampton/GTA property insights from Harman Sangha, RE/MAX Gold Realty.",
  openGraph: {
    title: "Harman Homes Blog",
    description:
      "Brampton and GTA real estate guidance from Harman Sangha, RE/MAX Gold Realty.",
    url: "https://www.harman.homes/blog",
    siteName: "Harman Homes",
    type: "website",
    images: [
      {
        url: "https://www.harman.homes/files/og_images/16257/og_image.jpg",
        width: 1200,
        height: 630,
        alt: "Harman Sangha"
      }
    ]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

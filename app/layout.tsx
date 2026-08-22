import type { Metadata } from "next";
import "./globals.css";

const title = "Clarence John Villanueva | Technical Support & Electronics Engineering";
const description = "Portfolio of Clarence John Villanueva, an academically complete Electronics Engineering graduate from Batch 2026 with experience in technical support, security systems, customer service, and operations.";
const metadataBase = new URL("https://clarence-villanueva-portfolio.vercel.app");

export const metadata: Metadata = {
  metadataBase,
  title,
  description,
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title,
    description,
    type: "website",
    images: [{ url: new URL("/og.png", metadataBase), width: 1792, height: 910, alt: "Clarence John Villanueva technical support and electronics engineering portfolio" }],
  },
  twitter: { card: "summary_large_image", title, description, images: [new URL("/og.png", metadataBase)] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

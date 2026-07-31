import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

const title = "Clarence John Villanueva | Technical Support & Electronics Engineering";
const description = "Portfolio of Clarence John Villanueva, a fourth-year Electronics Engineering student with experience in technical support, security systems, customer service, and operations.";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const baseUrl = new URL(`${protocol}://${host}`);

  return {
    metadataBase: baseUrl,
    title,
    description,
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: {
      title,
      description,
      type: "website",
      images: [{ url: new URL("/og.png", baseUrl), width: 1792, height: 910, alt: "Clarence John Villanueva technical support and electronics engineering portfolio" }],
    },
    twitter: { card: "summary_large_image", title, description, images: [new URL("/og.png", baseUrl)] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

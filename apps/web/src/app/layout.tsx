import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { meta } from "$utils/consts";
import "$styles/main.scss";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: meta.color,
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    creator: meta.creator,
    authors: [{ name: "enna-ai", url: "https://github.com/enna-ai/vbusy" }],
    publisher: meta.creator,
    icons: { icon: meta.icon },
    metadataBase: new URL(meta.url),
    openGraph: {
      url: meta.url,
      title: meta.title,
      description: meta.description,
      images: [meta.banner],
      type: "website",
      siteName: meta.title,
    },
    twitter: {
      card: "summary_large_image",
      site: "Vbusy",
      creator: meta.creator,
      title: meta.title,
      description: meta.description,
      images: [meta.banner],
    },
  };
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      {children}
      </body>
    </html>
  )
}

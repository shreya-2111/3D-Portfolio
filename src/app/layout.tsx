import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sumit-tirmare.vercel.app"),
  title: {
    default: "Sumit Tirmare | Motion Graphic Designer & 2D Animator",
    template: "%s | Sumit Tirmare",
  },
  description:
    "Motion graphic designer portfolio for Sumit Tirmare featuring cinematic 2D visuals, brand films, product animations, and AI-generated storytelling.",
  applicationName: "Sumit Tirmare Portfolio",
  keywords: [
    "Motion Graphic Designer",
    "2D Animator",
    "Portfolio",
    "Brand Animation",
    "Product Visuals",
    "AI Generated Video",
    "Cinematic Motion Design",
  ],
  authors: [{ name: "Sumit Tirmare" }],
  creator: "Sumit Tirmare",
  publisher: "Sumit Tirmare",
  category: "Design Portfolio",
  openGraph: {
    title: "Sumit Tirmare | Motion Graphic Designer & 2D Animator",
    description:
      "Crafting visuals that move emotions through cinematic motion systems, 2D storytelling, and premium brand films.",
    type: "website",
    siteName: "Sumit Tirmare Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sumit Tirmare | Motion Graphic Designer & 2D Animator",
    description:
      "A cinematic motion design portfolio built with Next.js, GSAP, Framer Motion, and React Three Fiber.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}

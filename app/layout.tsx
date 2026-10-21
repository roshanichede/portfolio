import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Roshani Chede, Product & Engineering",
  description:
    "Roshani Chede is an engineer moving into product management, based in London. Four years at TCS on large insurance systems, an MSc with Distinction from Leicester, and a habit of starting with the customer’s real need.",
  openGraph: { title: "Roshani Chede, Product & Engineering", description: "An engineer moving into product. I start with the customer’s real need, then ship what solves it.", type: "website" },
};

export const viewport: Viewport = { themeColor: "#fdfdfb" };

// runs before paint so a saved or system dark theme doesn't flash light first
const THEME = `try{var t=localStorage.getItem("theme");if(t!=="dark"&&t!=="light")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t}catch(e){}`;

const FONTS =
  "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..700&family=Inter:wght@400..600&display=swap";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={FONTS} />
      </head>
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import { DM_Sans } from "next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
config.autoAddCss = false;
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Brian Traumuller: Web Portfolio",
  description: "This site showcases the work of Brian Traumuller, a fontend developer with 14 years experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="w-full top-0 z-20 animate-header">
          <div className="max-w-screen-xl mx-auto flex p-4">
            <div className="logo mr-auto self-center"><Link href="/"><FontAwesomeIcon icon={faHouse} className="text-2xl self-center text-white" /></Link></div>
            <nav className="py-2">
              <Link href="/projects" className="p-4 text-white">Portfolio</Link>
              <Link href="/files/BrianTraumuller_Resume_2024.pdf" className="p-4 text-white">Resume</Link>
            </nav>
          </div>
        </header>
        {children}
        <footer>
          <div className="text-center">Copyright 2024</div>
        </footer>
      </body>
    </html>
  );
}

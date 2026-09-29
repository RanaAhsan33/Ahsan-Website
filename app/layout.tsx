import type { Metadata } from "next";
import { Space_Grotesk, Syne } from "next/font/google";
import "./globals.css";

const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });

export const metadata: Metadata = {
  title: "Ahsan Iqbal Khan | Cybersecurity & Project Management",
  description:
    "Portfolio of Ahsan Iqbal Khan — cybersecurity analyst, project manager, CEH and CHFI certified professional.",
  openGraph: {
    title: "Ahsan Iqbal Khan | Cybersecurity & Project Management",
    description:
      "Cybersecurity analyst and project manager focused on secure delivery, threat analysis, security operations and execution.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${space.variable} ${syne.variable}`}>
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Diagnostic Gratuit — SymoAfrica",
  description:
    "Obtenez un diagnostic personnalisé de votre entreprise. Remplissez le formulaire et recevez vos recommandations.",
  openGraph: {
    title: "Diagnostic Gratuit — SymoAfrica",
    description:
      "Obtenez un diagnostic personnalisé de votre entreprise en 2 minutes.",
    siteName: "SymoAfrica",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${ibmPlexSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}

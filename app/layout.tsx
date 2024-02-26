import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ruRU } from "@clerk/localizations";
import { ModalProvider } from "@/providers/modal-provider";
import { ToasterProvider } from "@/providers/toast-provider";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const noto = Noto_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NomadTaxi",
  description: "Создано командой студентов IITU",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={ruRU}>
      <html lang="en">
        <body className={noto.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ToasterProvider />
            <ModalProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

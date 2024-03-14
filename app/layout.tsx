import type { Metadata } from "next";
import { Manrope, Open_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ruRU } from "@clerk/localizations";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

const font = Open_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TaxiDashboard",
  description: "Создано командой студентов IITU",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      localization={ruRU}
      appearance={{
        baseTheme: dark,
        variables: {
          borderRadius: "1rem",
          fontFamily: "Open Sans, sans-serif",
        },
      }}
    >
      <html lang="en">
        <body className={font.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

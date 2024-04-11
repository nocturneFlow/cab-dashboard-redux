import type { Metadata } from "next";
import { Open_Sans as FontSans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ruRU } from "@clerk/localizations";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Cab Dashboard",
  description: "Создано командой студентов IITU",
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={ruRU}>
      <html lang="en">
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
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

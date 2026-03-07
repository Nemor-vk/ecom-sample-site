import type { Metadata } from "next";
import { Roboto, Lato, Poppins } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react"
import { auth } from "@/auth.config";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: '500',
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: '400',
});


export const metadata: Metadata = {
  title: "Eccomerce website",
  description: "Eccomerce web app",
};

const RootLayout = async({ children }: { children: ReactNode }) => {

  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <SessionProvider session={session}>
      <body className={`${poppins.className} min-h-screen overflow:auto antialiased`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            >
        {children}
        </ThemeProvider>
      </body>
      </SessionProvider>
    </html>
  );
};

export default RootLayout;
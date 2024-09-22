import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ApolloWrapper } from "@/libs/apollo/ApolloWrapper";
import AppLayout from "./AppLayout";
import "@radix-ui/themes/styles.css";
// import { ThemeProvider } from "next-themes";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "捉虫基地",
  description: "虫窝,这里聚集着一些捉虫小能手,并留下了一些bug",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <ThemeProvider attribute="class"> */}
        <ApolloWrapper>
          <AppLayout>{children}</AppLayout>
        </ApolloWrapper>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}

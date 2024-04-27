import type { Metadata } from "next";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { ApolloWrapper } from "@/lib/apollo-provider";
import Header from "./Header";
import "./globals.css";
import Footer from "./Footer";
const __DEV__ = process.env.NODE_ENV !== "production"
if (__DEV__) {
  loadDevMessages();
  loadErrorMessages();
}

export const metadata: Metadata = {
  title: "title",
  description: "description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-full" data-theme="light" lang="en">
      <link rel="icon" href="/logo.ico" />
      <body className="h-full">
        <ApolloWrapper>
          <Header />
          <main className="min-h-full">
            {children}
          </main>
          <Footer />
        </ApolloWrapper>
      </body>
    </html>
  );
}

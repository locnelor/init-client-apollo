import type { Metadata } from "next";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { ApolloWrapper } from "@/lib/apollo-provider";
import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import HomeLayout from "./HomeLayout";
import HomeProvider from "@/lib/home-provider";
import { ProgressBar } from "./progress-bar";
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
    <html data-theme="light" lang="en">
      <link rel="icon" href="/logo.ico" />
      <body
        style={{ background: "#f5f5f5" }}
      >
        <ApolloWrapper>
          <AntdRegistry>
            <HomeProvider>
              <HomeLayout>
                  {children}
              </HomeLayout>
            </HomeProvider>
          </AntdRegistry>
        </ApolloWrapper>
      </body>
    </html>
  );
}

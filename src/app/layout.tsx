import LayoutProvider from "@/components/LayoutProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./../stylesheets/antdOverride.css";
import "./../stylesheets/commonClassess.css";
import "./../stylesheets/layout.css";
import "./../stylesheets/loader.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Job Portal",
  description: "Creating exciting job opportunities",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutProvider>{children}</LayoutProvider>;
}

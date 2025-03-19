import type { Metadata } from "next";

import { Open_Sans } from "next/font/google";
import "@/app/globals.css";
import { LeadsSidebar } from "./_components/LeadsSidebar";
import styles from "./_styles/admin.module.css";
const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alma",
  description: "Alma Law Tech",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${openSans.variable} ${styles.admin}`}>
      <LeadsSidebar>{children}</LeadsSidebar>
    </div>
  );
}


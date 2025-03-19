"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "../_styles/sidebar.module.css";
import { useRouter } from "next/navigation";
interface Props {
  children: React.ReactNode;
}

export const LeadsSidebar = ({ children }: Props) => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathName = usePathname();

  const handleSignOut = async () => {
    try {
      const response = await fetch("/api/auth/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        router.push("/");
        router.refresh();
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathName]);
  return (
    <div className={styles.container}>
      <button
        className={styles.mobileMenuButton}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle menu"
      >
        {isSidebarOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        )}
      </button>
      <div
        className={`${styles.overlay} ${
          isSidebarOpen ? styles.overlayVisible : ""
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />
      <aside
        className={`${styles.sidebar} ${
          isSidebarOpen ? styles.sidebarOpen : ""
        }`}
      >
        <div className={styles.logoContainer}>
          <div className={styles.logoBackground} />
          <Link href="/" className={styles.logoText}>
            alma
          </Link>
        </div>

        <nav className={styles.navigation}>
          <Link
            href="/admin/leads"
            className={`${styles.navItem} ${
              pathName === "/admin/leads" ? styles.activeNavItem : ""
            }`}
          >
            Leads
          </Link>
          <Link
            href="/admin/settings"
            className={`${styles.navItem} ${
              pathName === "/admin/settings" ? styles.activeNavItem : ""
            }`}
          >
            Settings
          </Link>
        </nav>
        <div className={styles.sidebarFooter}>
          <button
            className={styles.signOutButton}
            onClick={handleSignOut}
            aria-label="Sign out"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.signOutIcon}
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Sign Out
          </button>
        </div>
      </aside>
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
};


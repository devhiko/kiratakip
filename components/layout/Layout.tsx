import React from "react";
import { Footer } from "./Footer";
import styles from "./Layout.module.css";
import { NavbarComponent } from "./Navbar";

type LayoutProps = { children: React.ReactNode };

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div data-testid="lyt">
      <NavbarComponent />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};

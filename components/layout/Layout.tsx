import React from "react"
import { Footer } from "./Footer"
import { NavbarComponent } from "./Navbar"
import styles from './Layout.module.css'

type LayoutProps = { children: React.ReactNode }

export const Layout = ({ children }: LayoutProps) => {

  return (
    <>
      <NavbarComponent />
      <main className={styles.main}>
        {children}
      </main>
      <Footer />
    </>
  )
}

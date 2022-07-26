import React from "react"
import { Footer } from "./Footer"
import { NavbarComponent } from "./Navbar"

type LayoutProps = { children: React.ReactNode }

export const Layout = ({ children }: LayoutProps) => {

  return (
    <>
      <NavbarComponent />
      <main className="main">
        {children}
      </main>
      <Footer />
    </>
  )
}

import { ReactNode } from "react";
import Header from "./_components/Header";
import Footer from "./_components/Footer"
import "./globals.css"

export default function RootLayout({
  children,
}: {children : ReactNode}
){
  return(
    <html lang="en">
      
      <body className="flex flex-col min-h-screen">
        <Header></Header>
        <main className="m-5 grow">{children}</main>
        <Footer></Footer>
        
      </body>
      
    </html>
  )
}
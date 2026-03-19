import { ReactNode } from "react";
import Header from "./_components/Header";
import Footer from "./_components/Footer"
import "./globals.css"
import { CartProvider } from "@/features/e-commerce/presentation/hooks/cart.hooks"

export default function RootLayout({
  children,
}: {children : ReactNode}
){
  return(
    <html lang="en">
      
      <body className="flex flex-col min-h-screen">
        <CartProvider>
          <Header></Header>
          <main className="m-5 grow">{children}</main>
          <Footer></Footer>
        </CartProvider>
      </body>
      
    </html>
  )
}

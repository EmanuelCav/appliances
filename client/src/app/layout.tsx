import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import './globals.css'

import ProductContextGlobal from '@/server/actions/products.actions'

import Header from '@/components/header/header'
import Navigation from '@/components/navigation/navigation'

const lato = Lato({ subsets: ['latin'], weight: '400' })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="oven.svg" type="image/x-icon" />
      </head>
      <body className={lato.className}>
        <div className="container-body">
          <ProductContextGlobal>
            <Header />
            <Navigation />
            <div className="container mx-auto bg-white">
              {children}
            </div>
          </ProductContextGlobal>
        </div>
      </body>
    </html>
  )
}

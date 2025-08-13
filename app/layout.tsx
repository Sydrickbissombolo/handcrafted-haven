import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://handcrafted-haven.example'),
  title: {
    default: 'Handcrafted Haven',
    template: '%s | Handcrafted Haven'
  },
  description: 'A community marketplace for handmade goods.',
  openGraph: {
    title: 'Handcrafted Haven',
    description: 'Discover unique, handcrafted treasures.',
    type: 'website'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <a href="#main" className="skip-link">Skip to main content</a>
          <Header />
          <main id="main" className="container">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

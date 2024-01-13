import NavBar from '@/components/NavBar'
import './globals.css'
import { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'Holka App',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  )
}

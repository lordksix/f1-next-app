import './globals.css'
import { Roboto } from 'next/font/google'
import Providers from '@/redux/Providers'

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '700', '900'],
})

export const metadata = {
  title: 'lordkisx f1mania',
  description: 'F1 news and information application',
}

function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} bg-white dark:bg-black text-black dark:text-white`}>
      <Providers>
        {children}
      </Providers>
      </body>
    </html>
  )
}

export default RootLayout;

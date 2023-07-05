import { Providers } from '@/redux/provider'
import './globals.css'
import { Roboto } from 'next/font/google'
import { wrapper } from '@/redux/store'

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
      <body className={roboto.className}>
        {children}
      </body>
    </html>
  )
}

export default wrapper.withRedux(RootLayout);

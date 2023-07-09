import './globals.css'
import cx from "classnames";
import { sfPro, roboto } from './fonts';
import Footer from '@/components/layout/footer';

export const metadata = {
  title: 'lordkisx f1mania',
  description: 'F1 news and information application',
  author: 'created by @lordksix at github',
};

function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${cx(sfPro.variable, roboto.variable)} min-h-screen bg-gradient-to-br no-scrollbar from-indigo-50 via-white to-cyan-100" dark:from-black dark:to-black text-black dark:text-white w-screen`}
        suppressHydrationWarning={true} 
      >
      {children}
      <Footer />
    </body>
    </html>
  );
}

export default RootLayout;

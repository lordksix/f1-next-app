import './globals.css';
import { f1tffReg } from './fonts';
import Footer from '@/components/layout/footer';
import AuthProvider from './context/AuthProvider';

export const metadata = {
  title: 'Lordkisx F1Mania Homepage',
  description:
    'Formula 1 news and information. Get latest results, Formula 1 calendar and schedule, historical data and latest news.',
  twitter: {
    card: "summary_large_image",
    title: "Lordksix F1Mania - Latest news and information about Formula 1",
    description:
      "Formula 1 news and information. Get latest results, Formula 1 calendar and schedule, historical data and latest news.",
    creator: "@wapasquel",
  },
  metadataBase: new URL("https://f1-next-app.vercel.app/"),
  author: 'Created by @lordksix at github',
};

function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${f1tffReg.variable} min-h-screen bg-gradient-to-br no-scrollbar from-indigo-50 via-white to-cyan-100" dark:from-black dark:to-black text-black dark:text-white/90 w-screen`}
        suppressHydrationWarning={true} 
      >
        <AuthProvider>
          {children}
          <Footer />
        </AuthProvider>
    </body>
    </html>
  );
}

export default RootLayout;

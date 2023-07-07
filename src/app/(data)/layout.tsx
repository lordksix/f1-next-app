import HeaderData from '@/components/layout/HeaderData';
import { Suspense } from 'react';

function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    <Suspense fallback="loading">
      <HeaderData />
    </Suspense>
    <main className="flex min-h-screen w-full flex-col items-center justify-center py-32">
    <Suspense fallback="Fetching data">
      {children}
    </Suspense>
    </main>
    </>
  )
}

export default RootLayout;

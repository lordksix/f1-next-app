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
    <main className="flex flex-col items-center justify-center w-full min-h-screen py-32">
      {children}
    </main>
    </>
  )
}

export default RootLayout;

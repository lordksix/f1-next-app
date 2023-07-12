import HeaderNav from '@/components/layout/HeaderNav';

function ResultsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    <HeaderNav />
    <main className="flex flex-col items-center justify-center w-full max-w-2xl min-h-screen py-32 mx-auto sm:w-11/12 no-scrollbar md:w-10/12">
      {children}
    </main>
    </>
  )
}

export default ResultsLayout;

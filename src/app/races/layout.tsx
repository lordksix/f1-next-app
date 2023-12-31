import HeaderNav from '@/components/layout/HeaderNav';

function RacesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    <HeaderNav />
    <main className="flex flex-col items-center justify-center w-full max-w-4xl min-h-screen py-32 mx-auto no-scrollbar md:w-11/12 g:w-10/12">
      {children}
    </main>
    </>
  )
}

export default RacesLayout;

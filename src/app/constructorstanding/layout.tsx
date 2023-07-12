import HeaderNav from '@/components/layout/HeaderNav';

function ConstructorstandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <HeaderNav />
      <main className="flex flex-col items-center justify-center w-10/12 max-w-xl min-h-screen py-32 mx-auto no-scrollbar md:w-10/12 g:w-9/12">
        {children}
      </main>
    </>
  )
}

export default ConstructorstandingLayout;

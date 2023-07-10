import HeaderData from '@/components/layout/HeaderData';

function DriverstandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <HeaderData />
      <main className="w-10/12 max-w-3xl min-h-screen py-32 mx-auto no-scrollbar md:w-10/12 g:w-9/12">
        {children}
      </main>
    </>
  )
}

export default DriverstandingLayout;

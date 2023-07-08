import HeaderData from '@/components/layout/HeaderData';

function ConstructorstandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <HeaderData />
      <main className="flex flex-col items-center justify-center w-full min-h-screen py-32">
        {children}
      </main>
    </>
  )
}

export default ConstructorstandingLayout;

import HeaderNav from '@/components/layout/HeaderNav';

function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <HeaderNav />
      <main className="flex flex-col w-10/12 max-w-2xl min-h-screen pt-20 mx-auto no-scrollbar md:w-10/12 g:w-9/12">
        {children}
      </main>
    </>
  )
}

export default ProfileLayout;

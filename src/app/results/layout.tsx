function ResultsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    <main className="flex flex-col items-center justify-center w-full min-h-screen py-32">
      {children}
    </main>
    </>
  )
}

export default ResultsLayout;

import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation'


export default async function ProfilePage() {
  const session = await getServerSession(options)
  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/server')
  }
  const { user } = session;


  return (
    <section className="min-h-screen pt-20 bg-ct-blue-600">
      <div className="max-w-4xl mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex justify-center items-center">
        <div>
          <p className="mb-3 text-5xl font-semibold text-center">
            Profile Page
          </p>
          <div className="mt-8">
            <p className="mb-3">Id: {user?.id}</p>
            <p className="mb-3">Name: {user?.name}</p>
            <p className="mb-3">Email: {user?.email}</p>
            <p className="mb-3">Role: {user?.role}</p>
            <p className="mb-3">Verified: {String(user?.emailVerified)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

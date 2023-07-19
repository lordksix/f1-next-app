import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation'


export default async function ProfilePage() {
  const session = await getServerSession(options)

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/profile')
  }
  const { user } = session;

  return (
    <section className="w-full h-full py-4 rounded-md bg-ct-blue-600">
      <div className="flex justify-center w-10/12 h-full pt-4 mx-auto text-black rounded-md bg-ct-dark-100">
        <div>
          <p className="mb-3 text-5xl font-semibold text-center">
            Profile Page
          </p>
          <div className="mt-8">
            <p className="mb-3">Name: {user?.name}</p>
            <p className="mb-3">Email: {user?.email}</p>
            <p className="mb-3">Role: {user?.role || 'user'}</p>
            <p className="mb-3">Verified: {String(user?.emailVerified)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

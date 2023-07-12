'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { LayoutDashboard, LogOut } from 'lucide-react';
import Popover from '@/components/shared/popover';
import Image from 'next/image';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';

export default function UserDropdown({ session }: { session: Session }) {
  const { email, image } = session?.user || {};
  const [openPopover, setOpenPopover] = useState(false);
  const router = useRouter();
  if (!email) return null;

  return (
    <div className="relative inline-block text-left">
      <Popover
        content={
          <div className="w-full p-2 rounded-md bg-slate-700 dark:bg-white sm:w-56">
            <button
              className="relative flex items-center justify-start w-full p-2 space-x-2 text-sm text-left transition-all duration-75 rounded-md hover:bg-gray-100 dark:hover:bg-gray-200 text-white/90 dark:text-black"
              onClick={() => router.push('/profile')}
            >
              <LayoutDashboard className="w-4 h-4" />
              <p className="text-sm">Profile</p>
            </button>
            <button
              className="relative flex items-center justify-start w-full p-2 space-x-2 text-sm text-left transition-all duration-75 rounded-md hover:bg-gray-100 dark:hover:bg-gray-200 text-white/90 dark:text-black"
              onClick={() => signOut()}
            >
              <LogOut className="w-4 h-4" />
              <p className="text-sm">Logout</p>
            </button>
          </div>
        }
        align="end"
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
      >
        <button
          onClick={() => setOpenPopover(!openPopover)}
          className="flex items-center justify-center w-8 h-8 overflow-hidden transition-all duration-75 border border-gray-300 rounded-full focus:outline-none active:scale-95 sm:h-9 sm:w-9"
        >
          <Image
            alt={email}
            src={image || `https://avatars.dicebear.com/api/micah/${email}.svg`}
            width={40}
            height={40}
          />
        </button>
      </Popover>
    </div>
  );
}

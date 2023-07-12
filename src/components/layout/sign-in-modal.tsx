import Modal from '@/components/shared/modal';
import { signIn } from 'next-auth/react';
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from 'react';
import { LoadingDots } from '@/components/shared/icons';
import Image from 'next/image';
import Link from 'next/link';
import { GoHomeFill } from 'react-icons/go';
import SignInBtn from '../shared/signbtnselector';

const SignInModal = ({
  showSignInModal,
  setShowSignInModal,
}: {
  showSignInModal: boolean;
  setShowSignInModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [signInClicked, setSignInClicked] = useState(false);

  const signInBtn = (provider: string) => (
    <button
    disabled={signInClicked}
    className={`${
      signInClicked
        ? "cursor-not-allowed border-gray-200 bg-gray-100"
        : "border border-gray-200 bg-white text-black hover:bg-gray-50"
    } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
    onClick={() => {
      setSignInClicked(true);
      signIn(provider);
    }}
  >
    {signInClicked ? (
      <LoadingDots color="#808080" />
    ) : (
      <SignInBtn provider={provider}/>
    )}
  </button>
  );
  return (
    <Modal showModal={showSignInModal} setShowModal={setShowSignInModal}>
      <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200">
        <div className="flex flex-col items-center justify-center px-4 py-6 pt-8 space-y-3 text-center bg-black border-b border-gray-700 text-white/90 md:px-16 dark:bg-white dark:border-gray-200 dark:text-black">
          <Link href="/" className="flex flex-wrap items-center justify-center gap-4">
            <GoHomeFill />
            <Image
              src="/lordksix-logos_transparent.png"
              alt="lordksix logo"
              width="67"
              height="20"
              className="w-32 h-10 mr-2 rounded-sm dark:bg-black dark:bg-transparent"
            />
            <h3 className="text-2xl font-bold font-display">F1mania</h3>
          </Link>
          <h4 className="text-xl font-bold font-display">Sign In</h4>
          <p className="text-sm text-gray-500">
            This is strictly for demo purposes - only your email and profile
            picture will be stored.
          </p>
        </div>

        <div className="flex flex-col px-4 py-8 space-y-4 bg-gray-50 md:px-16">
          {signInBtn('google')}
          {signInBtn('github')}
          {signInBtn('facebook')}
          {signInBtn('credencial')}
        </div>
      </div>
    </Modal>
  );
};

export function useSignInModal() {
  const [showSignInModal, setShowSignInModal] = useState(false);

  const SignInModalCallback = useCallback(() => {
    return (
      <SignInModal
        showSignInModal={showSignInModal}
        setShowSignInModal={setShowSignInModal}
      />
    );
  }, [showSignInModal, setShowSignInModal]);

  return useMemo(
    () => ({ setShowSignInModal, SignInModal: SignInModalCallback }),
    [setShowSignInModal, SignInModalCallback],
  );
}

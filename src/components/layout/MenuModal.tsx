import Modal from '@/components/shared/modal';
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import Image from 'next/image';
import Link from 'next/link';
import { GoHomeFill } from 'react-icons/go';
import LinksBtnGen from './LinksBtnGen';


const MenuModal = async ({
  showMenuModal,
  setShowMenuModal,
}: {
  showMenuModal: boolean;
  setShowMenuModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [menuClicked, setMenuClicked] = useState(false);

  const links = [
    { path: '/posts', text: 'News' },
    { path: '/results/current/last', text: 'Last Race Results' },
    { path: '/races/current/next', text: 'Next Race Schedule' },
    { path: '/driverstanding/current', text: 'Driver Standing' },
    { path: '/constructorstanding/current', text: 'Constructor Standing' },
    { path: '/races/current', text: 'F1 Calendar' },
  ];

  return (
    <Modal showModal={showMenuModal} setShowModal={setShowMenuModal}>
      <div className="w-full overflow-hidden shadow-xl lg:max-w-md lg:rounded-2xl lg:border lg:border-gray-200">
        <div className="flex flex-col items-center justify-center px-4 py-6 pt-8 space-y-3 text-center text-white bg-gray-800 border-b border-gray-200 dark:text-black dark:bg-gray-400 lg:px-16">
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
        </div>

        <div className="flex flex-col justify-center w-full px-4 py-8 space-y-4 align-middle bg-gray-950 dark:bg-gray-200 lg:px-16">
        <LinksBtnGen links={links} menuClicked={menuClicked} setMenuClicked={setMenuClicked} />
        </div>
      </div>
    </Modal>
  );
};

export function useMenuModal() {
  const [showMenuModal, setShowMenuModal] = useState(false);

  const MenuModalCallback = useCallback(() => {
    return (
      <MenuModal
        showMenuModal={showMenuModal}
        setShowMenuModal={setShowMenuModal}
      />
    );
  }, [showMenuModal, setShowMenuModal]);

  return useMemo(
    () => ({ setShowMenuModal, MenuModal: MenuModalCallback }),
    [setShowMenuModal, MenuModalCallback],
  );
}

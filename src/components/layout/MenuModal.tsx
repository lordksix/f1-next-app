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
import { LoadingDots } from '../shared/icons';
import { nanoid } from '@reduxjs/toolkit';


const MenuModal = async ({
  showMenuModal,
  setShowMenuModal,
}: {
  showMenuModal: boolean;
  setShowMenuModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [menuClicked, setMenuClicked] = useState(false);

  const links = [
    { path: '/', text: 'Home' },
    { path: '/posts', text: 'News' },
    { path: '/results/current/last', text: 'Last Race Results' },
    { path: '/races/current/next', text: 'Next Race Schedule' },
    { path: '/driverstanding/current', text: 'Driver Standing' },
    { path: '/constructorstanding/current', text: 'Constructor Standing' },
    { path: '/races/current', text: 'F1 Calendar' },
    { path: '/races', text: 'Historical F1 Calendar' },
  ];

  const linkBtns = (
    links.map((link) => (
      <button
        key={nanoid()}
        disabled={menuClicked}
        className={`${
          menuClicked
            ? "cursor-not-allowed border-gray-200 bg-gray-100"
            : "border border-gray-200 bg-white text-black hover:bg-gray-100"
        } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
        onClick={() => {
          setMenuClicked(false);
        }}
      >
          {menuClicked ? (
            <LoadingDots color="#808080" />
          ) : (
            <Link
              href={link.path}
              className="flex items-center justify-center w-full h-full"
            >
              {link.text}
            </Link>
          )}
      </button>
      
    ))
  );

  return (
    <Modal showModal={showMenuModal} setShowModal={setShowMenuModal}>
      <div className="w-full overflow-hidden shadow-xl lg:max-w-md lg:rounded-2xl lg:border lg:border-gray-200">
        <div className="flex flex-col items-center justify-center px-4 py-6 pt-8 space-y-3 text-center text-white bg-gray-800 border-b border-gray-200 dark:text-black dark:bg-gray-400 lg:px-16">
          <Link href="/" className="flex items-center gap-4">
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
          {linkBtns}
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

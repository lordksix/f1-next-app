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


const MenuModal = ({
  showMenuModal,
  setShowMenuModal,
}: {
  showMenuModal: boolean;
  setShowMenuModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [menuClicked, setMenuClicked] = useState(false);
  const links = [
    { path: '/', text: 'Home' },
    { path: '/standing', text: 'Standing' },
    { path: '/schedule', text: 'Schedule' },
  ];
  const linkBtns = (
    links.map((link) => (
      <Link
        key={nanoid()}
        href={link.path}
        className="w-full"
      >
        <button
          disabled={menuClicked}
          className={`${
            menuClicked
              ? "cursor-not-allowed border-gray-200 bg-gray-100"
              : "border border-gray-200 bg-white text-black hover:bg-gray-50"
          } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
          onClick={() => {
            setMenuClicked(true);
          }}
        >
          {menuClicked ? (
            <LoadingDots color="#808080" />
          ) : (
            <>
              {link.text}
            </>
          )}
        </button>
      </Link>
    ))
  );

  return (
    <Modal showModal={showMenuModal} setShowModal={setShowMenuModal}>
      <div className="w-full overflow-hidden shadow-xl lg:max-w-md lg:rounded-2xl lg:border lg:border-gray-200">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-gray-800 dark:bg-gray-400 px-4 py-6 pt-8 text-center lg:px-16 text-black">
          <Link href="/">
            <Image
              src="/lordksix-logos_transparent.png"
              alt="lordksix logo"
              width="67"
              height="20"
              className="mr-2 rounded-sm bg-black dark:bg-transparent h-10 w-32"
            />
          </Link>
          <h3 className="font-display text-2xl font-bold">F1mania</h3>
        </div>

        <div className="flex flex-col align-middle justify-center space-y-4 bg-gray-950  dark:bg-gray-200 px-4 py-8 lg:px-16 w-full">
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

'use client';

import { Dispatch, SetStateAction, ReactNode, useRef } from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import useWindowSize from '@/lib/hooks/use-window-size';
import Leaflet from './leaflet';

export default function Popover({
  children,
  content,
  align = "center",
  openPopover,
  setOpenPopover,
}: {
  children: ReactNode;
  content: ReactNode | string;
  align?: "center" | "start" | "end";
  openPopover: boolean;
  setOpenPopover: Dispatch<SetStateAction<boolean>>;
}) {
  const { isMobile, isDesktop } = useWindowSize();
  if (!isMobile && !isDesktop) return <>{children}</>;
  return (
    <>
      {isMobile && children}
      {openPopover && isMobile && (
        <Leaflet setShow={setOpenPopover}>{content}</Leaflet>
      )}
      {isDesktop && (
        <PopoverPrimitive.Root
          open={openPopover}
          onOpenChange={(isOpen) => setOpenPopover(isOpen)}
        >
          <PopoverPrimitive.Trigger className="inline-flex" asChild>
            {children}
          </PopoverPrimitive.Trigger>
          <PopoverPrimitive.Content
            sideOffset={4}
            align={align}
            className="z-20 items-center bg-black border border-gray-800 rounded-md dark:bg-white dark:border-gray-200 animate-slide-up-fade drop-shadow-lg"
          >
            {content}
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Root>
      )}
    </>
  );
}

import navpaths from '@/lib/navbarpaths';
import { nanoid } from '@reduxjs/toolkit';
import Link from 'next/link';

const NavbarData = async() => {
  const links = await navpaths();

  const navbar = (
    links.map((link) => (
      <li key={nanoid()}>
        <Link
          href={link.path}
        >
          {link.text}
        </Link>
      </li>
    ))
  );
  return (
    <nav><ul className="flex list-none gap-2">{navbar}</ul></nav>
  );
}

export default NavbarData;
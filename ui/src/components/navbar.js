import React from 'react';

export const NavItem = ({ children }) => (
  <li className="px-3 py-2 text-xs uppercase font-bold text-gray-800 hover:text-gray-600">
    {children}
  </li>
);

export const NavBarBase = ({ children }) => (
  <nav className="w-full bg-white px-2 py-3 navbar-expand-lg shadow-lg">
    <ul className="flex flex-row flex-wrap list-none">{children}</ul>
  </nav>
);

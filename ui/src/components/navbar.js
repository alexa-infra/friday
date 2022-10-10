import React from 'react';
import { Link } from 'react-router-dom';


const NavItem = ({ children }) => (
  <li className="px-3 py-2 text-xs uppercase font-bold text-gray-800 hover:text-gray-600">
    { children }
  </li>
);


const NavBarBase = ({ children }) => (
  <nav className="w-full bg-white px-2 py-3 navbar-expand-lg shadow-lg">
    <ul className="flex flex-row flex-wrap list-none">
      { children }
    </ul>
  </nav>
);


export const NavBar = () => (
  <NavBarBase>
    <NavItem>
      <Link to="/">Home</Link>
    </NavItem>
    <NavItem>
      <Link to="/bookmarks">ReadLater</Link>
    </NavItem>
    <NavItem>
      <Link to="/events">Events</Link>
    </NavItem>
    <NavItem>
      <Link to="/docs">Docs</Link>
    </NavItem>
    <NavItem>
      <Link to="/todo">Todo</Link>
    </NavItem>
    <NavItem>
      <Link to="/recipes">Recipes</Link>
    </NavItem>
    <NavItem>
      <Link to="/ratio">Ratio</Link>
    </NavItem>
  </NavBarBase>
);

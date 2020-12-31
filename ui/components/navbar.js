import React from 'react';
import { Link } from 'react-router-dom';


const NavItem = ({ children }) => (
  <li className="px-3 py-2 flex items-center text-xs uppercase font-bold text-gray-800 hover:text-gray-600">
    { children }
  </li>
);


const NavBar = ({ children }) => (
  <nav className="w-full bg-white flex flex-wrap items-center px-2 py-3 navbar-expand-lg shadow-lg">
    <div className="container">
      <ul className="flex flex-row list-none">
        { children }
      </ul>
    </div>
  </nav>
);


const NavBarComponent = () => (
  <NavBar>
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
  </NavBar>
);

export default NavBarComponent;

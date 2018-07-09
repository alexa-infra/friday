import React from 'react'
import { NavLink } from 'react-router-dom';
import './navbar.css'


const NavBar = () => (
  <ul className="navbar theme-d5">
    <li>
      <NavLink className="brand" activeClassName="active" to="/">Reader</NavLink>
    </li>
    <li>
      <NavLink activeClassName="active" to="/bookmarks">Read Later</NavLink>
    </li>
    <li>
      <NavLink activeClassName="active" to="/events">Events</NavLink>
    </li>
    <li>
      <NavLink activeClassName="active" to="/docs">Docs</NavLink>
    </li>
  </ul>
)

export default NavBar

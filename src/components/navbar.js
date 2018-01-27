import React from 'react'
import { NavLink } from 'react-router-dom';


const NavBar = () => (
  <div className="navbar navbar-inverse">
    <div className="container">
      <div className="navbar-header">
        <NavLink className="navbar-brand" to="/">Reader</NavLink>
      </div>
      <div className="collapse navbar-collapse">
        <ul className="nav navbar-nav">
          <li>
            <NavLink activeClassName="active" to="/read-later">Read Later</NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/events">Events</NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/docs">Docs</NavLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
)

export default NavBar
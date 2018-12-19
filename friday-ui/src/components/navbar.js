import React from 'react'
import Navbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import { LinkContainer } from 'react-router-bootstrap'


export default () => (
  <Navbar bg="dark" variant="dark">
    <LinkContainer to="/">
      <Navbar.Brand>Reader</Navbar.Brand>
    </LinkContainer>
    <Nav className="mr-auto">
      <LinkContainer to="/bookmarks">
        <Nav.Link>Read later</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/events">
        <Nav.Link>Events</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/docs">
        <Nav.Link>Docs</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/recipes">
        <Nav.Link>Recipes</Nav.Link>
      </LinkContainer>
    </Nav>
  </Navbar>
);

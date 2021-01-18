import React from "react";
import { Navbar, Nav, NavDropdown, Form, FormControl } from "react-bootstrap";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";

const PublicNavBar = ({handleSearchTermChange,searchTerm,handleSelect}) => {
  
  return (
    <Navbar
      className="fixed-top nav-trans"
      variant="dark"
      expand="lg"
      style={{ fontSize: 20 }}
    >
      <Navbar.Brand href="#home">
        <img src={logo} atl="logo" width="200" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            Currently Playing
          </Nav.Link>
          <Nav.Link as={Link} to="/movie/upcoming">
            Upcoming
          </Nav.Link>
          <Nav.Link as={Link} to="/movie/top_rated">
            Top Rated
          </Nav.Link>
          <NavDropdown title="Sort" id="basic-nav-dropdown" onSelect={handleSelect}>
            <NavDropdown.Item eventKey="mostToLeastPopular">Most To Least Popular</NavDropdown.Item>
            <NavDropdown.Item eventKey="leastToMostPopular">Least to Most Popular</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item eventKey="highestToLowestRating">Highest to Lowest Rating</NavDropdown.Item>
            <NavDropdown.Item eventKey="lowestToHighestRating">Lowest to Highest Rating</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form inline>
          <FormControl
            type="text"
            onChange={handleSearchTermChange}
            value={searchTerm}
            placeholder="Search"
            className="mr-sm-2"
          />
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default PublicNavBar;

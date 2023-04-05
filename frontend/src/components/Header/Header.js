import React, { useEffect } from "react";
import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../../actions/userActions";
import { Link, useNavigate } from "react-router-dom";

function Header({ setSearch }) {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {}, [userInfo]);

  return (
    <Navbar bg="primary" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Cloud_For_All</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <LinkContainer to="/about">
              <Navbar.Brand>About</Navbar.Brand>
            </LinkContainer>
            {userInfo && (
              <Link to="/contact">
                <Navbar.Brand>Contact</Navbar.Brand>
              </Link>
            )}
            {userInfo && (
              <NavDropdown
                title={userInfo && userInfo.name}
                id="navbarScrollingDropdown"
              >
                <NavDropdown.Item>
                  <Link to="/mynotes" style={{ textDecoration: "none" }}>
                    My Notes
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/profile" style={{ textDecoration: "none" }}>
                    My Profile
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
          {userInfo && (
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

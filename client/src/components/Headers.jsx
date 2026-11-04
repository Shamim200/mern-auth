import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { UseAuth } from "../context/Auth";
import { NavLink, Link } from "react-router-dom";
import DarkMode from "./DarkMode";

const authList = [
  {
    id: 1,
    name: "sign in",
    links: "/signin",
  },
  {
    id: 2,
    name: "sign up",
    links: "/signup",
  },
];

const routeList = [
  {
    id: 1,
    name: "dashboard",
    path: "/dashboard",
  },
  {
    id: 2,
    name: "change password",
    path: "/change-password",
  },
  {
    id: 3,
    name: "update profile",
    path: "/update-profile",
  },
];
const Headers = () => {
  const { user, userLogout } = UseAuth();

  return (
    <Navbar
      expand="sm"
      bg="dark"
      data-bs-theme="dark"
      className="bg-body-tertiary"
    >
      <Container>
        <Navbar.Brand>
          <img src="./vite.svg" alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto text-capitalize">
            {user && (
              <NavDropdown
                title={
                  <img
                    src={`${"public/profile.jpg"}`}
                    alt="avatar"
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      marginRight: "8px",
                    }}
                  />
                }
                id="nav-dropdown"
              >
                {routeList.map((item) => {
                  const { id, name, path } = item;
                  return (
                    <NavDropdown.Item
                      key={id}
                      as={NavLink}
                      to={path}
                      className="text-capitalize text-decoration-none"
                    >
                      {name}
                    </NavDropdown.Item>
                  );
                })}
                <NavDropdown.Item
                  className="text-capitalize"
                  onClick={userLogout}
                >
                  log out
                </NavDropdown.Item>
              </NavDropdown>
            )}
            {!user &&
              authList.map((item) => {
                const { id, name, links } = item;

                return (
                  <Nav.Link as={Link} to={links} key={id}>
                    {name}
                  </Nav.Link>
                );
              })}
          </Nav>
          <DarkMode />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Headers;

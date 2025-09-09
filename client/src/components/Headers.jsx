import { Navbar, Nav, Container } from "react-bootstrap";
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
const Headers = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
          <img src="./vite.svg" alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto text-capitalize">
            {authList.map((item) => {
              const { id, name, links } = item;

              return (
                <Nav.Link href={links} key={id}>
                  {name}
                </Nav.Link>
              );
            })}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Headers;

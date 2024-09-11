import React from "react";
import { Container, Navbar } from "react-bootstrap";
import logo from "../../assets/logo/logo.png"
const HeaderComponent = () => {
  return (
    <>
      <Navbar className="bg-body-tertiary " style={{height:"60px"}}>
        <Container>
          <Navbar.Brand href="#home">
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};

export default HeaderComponent;

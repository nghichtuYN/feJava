import React, { useEffect, useState } from "react";
import { Col, Container, Nav, Navbar } from "react-bootstrap";
import { CircleUser } from 'lucide-react';
import logo from "../../assets/logo/logo.png";
const HeaderComponent = () => {
  const NavBrandName = "Muong Thanh Luxury";
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // Cập nhật mỗi 1 giây

    return () => clearInterval(timer); // Clear interval khi component unmount
  }, []);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const localStringWithOptions = currentDate.toLocaleString("en-US", options);
  return (
    <>
      <Navbar className="bg-body-tertiary " style={{ height: "60px" }}>
        <Container
          style={{ margin: 0 }}
          fluid
          className=" d-flex justify-content-start"
        >
          <Navbar.Brand
            as={Col}
            md="3"
            className="d-inline-flex justify-content-start align-items-center ps-2"
            href="#home"
          >
            <img
              src={logo}
              width="40px"
              height="40px"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
            <p style={{ margin: 0 }} className="fw-bolder fs-5">
              {NavBrandName}
            </p>
          </Navbar.Brand>
          <Nav
            as={Col}
            md="9"
            className="d-flex justify-content-end align-items-center gap-5 pe-5 "
          >
            {localStringWithOptions}
            <CircleUser size={30}/>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default HeaderComponent;

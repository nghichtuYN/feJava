import React from "react";
import { Collapse, Container, Nav, Navbar } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "./style.css";
import { MdOutlineRoomService } from "react-icons/md";
import { GoListUnordered } from "react-icons/go";
import { RiExpandLeftLine } from "react-icons/ri";
import { RiExpandRightLine } from "react-icons/ri";
import { BedDouble, Home, Users } from "lucide-react";

const SideBarComponent = ({ toggle, Toggle }) => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  return (
    <>
      <Navbar
        className={`sidebar ${
          toggle ? "sidebar-collapsed" : "sidebar-expanded"
        }`}
        style={{ backgroundColor: "#111827" }}
      >
        <Container
          className="d-flex flex-column"
          style={{ padding: 0, margin: 0 }}
        >
          <Navbar.Brand
            className={`text-white d-flex justify-content-between w-100 ps-1`}
          >
            {!toggle && <p className="ps-3">Menu</p>}
            {toggle ? (
              <RiExpandRightLine
                style={{ marginLeft: "15px" }}
                onClick={Toggle}
                size={25}
              />
            ) : (
              <RiExpandLeftLine onClick={Toggle} size={25} />
            )}
          </Navbar.Brand>
          <Nav
            className={`me-auto d-flex flex-column align-items-start pt-3 ${
              !toggle ? "ps-2" : ""
            }`}
            style={{height:"90vh"}}
          >
            <Nav.Link
              className={`${pathname === "/dashboard" ? "active" : ""}`}
              onClick={() => navigate("/dashboard")}
            >
              <Home />

              <Collapse in={!toggle} dimension="width">
                <p className={`nav-text`}>Dashboard</p>
              </Collapse>
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/guests")}>
              <Users size={25} />
              <Collapse in={!toggle} dimension="width">
                <p className={`nav-text`}>Guests</p>
              </Collapse>
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/rooms")}>
              <BedDouble size={25} />
              <Collapse in={!toggle} dimension="width">
                <p className={`nav-text`}>Rooms</p>
              </Collapse>
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/services")}>
              <MdOutlineRoomService size={25} />
              <Collapse in={!toggle} dimension="width">
                <p className={`nav-text`}>Services</p>
              </Collapse>
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/orders")}>
              <GoListUnordered size={25} />
              <Collapse in={!toggle} dimension="width">
                <p className={`nav-text`}>Orders</p>
              </Collapse>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default SideBarComponent;

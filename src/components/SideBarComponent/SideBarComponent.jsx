import React from "react";
import { Collapse, Container, Nav, Navbar } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "./style.css";
import { MdOutlineRoomService } from "react-icons/md";
import { GoListUnordered } from "react-icons/go";
import { RiExpandLeftLine } from "react-icons/ri";
import { RiExpandRightLine } from "react-icons/ri";
import { BedDouble, Home, Users } from "lucide-react";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
const SideBarComponent = ({ toggle, Toggle }) => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const dashboard = "Dashboard";
  const guest = "Guests";
  const rooms = "Rooms";
  const services = "Services";
  const bookings = "Bookings";
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
              <ChevronsRight
                style={{ marginLeft: "15px" }}
                onClick={Toggle}
                size={30}
              />
            ) : (
              <ChevronsLeft onClick={Toggle} size={30} />
            )}
          </Navbar.Brand>
          <Nav
            className={`me-auto d-flex flex-column align-items-start pt-3 ${
              !toggle ? "ps-2" : ""
            }`}
            style={{ height: "90vh" }}
          >
            <Nav.Link
              className={`${pathname === "/dashboard" ? "active" : ""}`}
              onClick={() => navigate("/dashboard")}
            >
              <Home />

              <Collapse in={!toggle} dimension="width">
                <p className={`nav-text`}>{dashboard}</p>
              </Collapse>
            </Nav.Link>
            <Nav.Link
              className={`${pathname === "/guests" ? "active" : ""}`}
              onClick={() => navigate("/guests")}
            >
              <Users size={25} />
              <Collapse in={!toggle} dimension="width">
                <p className={`nav-text`}>{guest}</p>
              </Collapse>
            </Nav.Link>
            <Nav.Link
              className={`${pathname === "/rooms" ? "active" : ""}`}
              onClick={() => navigate("/rooms")}
            >
              <BedDouble size={25} />
              <Collapse in={!toggle} dimension="width">
                <p className={`nav-text`}>{rooms}</p>
              </Collapse>
            </Nav.Link>
            <Nav.Link
              className={`${pathname === "/services" ? "active" : ""}`}
              onClick={() => navigate("/services")}
            >
              <MdOutlineRoomService size={25} />
              <Collapse in={!toggle} dimension="width">
                <p className={`nav-text`}>{services}</p>
              </Collapse>
            </Nav.Link>
            <Nav.Link
              className={`${pathname === "/bookings" ? "active" : ""}`}
              onClick={() => navigate("/bookings")}>
              <GoListUnordered size={25} />
              <Collapse in={!toggle} dimension="width">
                <p className={`nav-text`}>{bookings}</p>
              </Collapse>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default SideBarComponent;

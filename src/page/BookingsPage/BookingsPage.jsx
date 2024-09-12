import React, { createContext, useState } from "react";
import PaninationComponent from "../../components/PaninationComponent/PaninationComponent";
import { Button, Col, Container, Dropdown, Row, Table } from "react-bootstrap";
import SearchComponent from "../../components/SearchComponent/SearchComponent";
export const ContextBookings = createContext("unknow");

const BookingsPage = () => {
  const isBookings = "Bookings";
  const [typeBookings, setTypeBookings] = useState("All Bookings");
  return (
    <ContextBookings.Provider>
      <div
        className="guests"
        style={{
          backgroundColor: "#eee",
          padding: "15px 15px",
          height: "120vh",
        }}
      >
        <Container fluid>
          <Row className="text-start ps-5 fw-bolder fs-4">{isBookings}</Row>
          <Row style={{ padding: "20px  60px 0 60px" }}>
            <Col md={2}>
              <Dropdown className="w-100">
                <Dropdown.Toggle
                  className="w-100"
                  variant="outline-dark"
                  id="dropdown-basic"
                >
                  {typeBookings}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => setTypeBookings("ALl Bookings")}
                  >
                    All Guests
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setTypeBookings("Standard")}>
                    Standard
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setTypeBookings("VIP")}>
                    VIP
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col md={8}>
              <SearchComponent placeholder={"Search..."} />
            </Col>
            <Col md={2}>
              <Button variant="dark">Add New Booking</Button>
            </Col>
          </Row>
          <Row style={{ padding: "20px 55px" }}>
            <Table responsive>
              <thead>
                <tr>
                  <th>#</th>
                  {Array.from({ length: 20 }).map((_, index) => (
                    <th key={index}>Table heading</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  {Array.from({ length: 20 }).map((_, index) => (
                    <td key={index}>Table cell {index}</td>
                  ))}
                </tr>
                <tr>
                  <td>2</td>
                  {Array.from({ length: 20 }).map((_, index) => (
                    <td key={index}>Table cell {index}</td>
                  ))}
                </tr>
                <tr>
                  <td>3</td>
                  {Array.from({ length: 20 }).map((_, index) => (
                    <td key={index}>Table cell {index}</td>
                  ))}
                </tr>
              </tbody>
            </Table>
          </Row>
          <Row style={{ padding: "20px 55px" }}>
            <Col className="d-flex justify-content-start align-items-center">
              10/230 records
            </Col>
            <Col className="d-flex justify-content-end align-items-center">
              <PaninationComponent />
            </Col>
          </Row>
        </Container>
      </div>
    </ContextBookings.Provider>
  );
};

export default BookingsPage;

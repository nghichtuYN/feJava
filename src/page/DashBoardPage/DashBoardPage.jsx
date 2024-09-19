import React, { createContext, useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import { useSelector } from "react-redux";

export const ContextDashboard = createContext("unknow");

const DashBoardPage = () => {
  const isDashboard = "Dashboard";
  const revenue = "Revenue";
  const totalRooms = "Total rooms";
  const quickActions = "Quick Actions";
  const checkInGuest = "Check-in Guest";
  const checkOutGuest = "Check-out Guest";
  const roomServices = "Room Services";
  const upComing = "Upcoming Check-ins/ Check-outs";
  const user = useSelector((state) => state.user);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!user?.name) {
      setShow(true);
    }
  }, [user]);
  console.log(!user?.name,show)

  
  const handleClose = () => {
    setIsCheckinGuest("");
    setIsCheckoutGuest("");
    setIsRoomService("");
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const [isCheckinGuest, setIsCheckinGuest] = useState("");
  const [isCheckoutGuest, setIsCheckoutGuest] = useState("");
  const [isRoomService, setIsRoomService] = useState("");
  const handleCheckinGuest = () => {
    setIsCheckinGuest(checkInGuest);
    handleShow();
  };
  const handleCheckoutGuest = () => {
    setIsCheckoutGuest(checkOutGuest);
    handleShow();
  };
  const handleRoomService = () => {
    setIsRoomService(roomServices);
    handleShow();
  };
  const value = useMemo(
    () => ({
      isCheckinGuest,
      checkInGuest,
      isCheckoutGuest,
      checkOutGuest,
      isRoomService,
      roomServices,
    }),
    [isCheckinGuest, isCheckoutGuest, isRoomService]
  );
  return (
    <ContextDashboard.Provider value={value}>
      <div
        className="dashboard"
        style={{
          backgroundColor: "#eee",
          padding: "15px 15px",
          height: "120vh",
        }}
      >
        <Container fluid>
          <Row className="text-start ps-5 fw-bolder fs-4">{isDashboard}</Row>
          <Row
            style={{ padding: "20px  60px 0 60px" }}
            className="d-flex justify-content-center align-items-center gap-5"
          >
            <Col className="w-100 " style={{ padding: 0 }}>
              <Card style={{ border: "1px solid" }}>
                <Card.Body className="text-start">
                  <Card.Title>{quickActions}</Card.Title>
                  <Card.Subtitle className="mb-2 mt-2 text-muted d-flex flex-column gap-4 ">
                    <Button variant="dark" onClick={handleCheckinGuest}>
                      {checkInGuest}
                    </Button>
                    <Button variant="dark" onClick={handleCheckoutGuest}>
                      {checkOutGuest}{" "}
                    </Button>
                    <Button variant="dark" onClick={handleRoomService}>
                      {roomServices}
                    </Button>
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
            <Col className="d-flex flex-column gap-5" style={{ padding: 0 }}>
              <Card style={{ border: "1px solid" }}>
                <Card.Body as={Row} className="text-start">
                  <div className="col-md-5">
                    <Card.Title className="fw-bolder">{totalRooms}</Card.Title>
                    <Card.Text>20 avaiable</Card.Text>
                  </div>
                  <Card.Subtitle
                    as={Col}
                    md="7"
                    className="mb-2 text-muted fs-2 fw-bolder"
                  >
                    100
                  </Card.Subtitle>
                </Card.Body>
              </Card>
              <Card style={{ border: "1px solid", marginTop: "5px" }}>
                <Card.Body as={Row} className="text-start">
                  <div className="col-md-5">
                    <Card.Title>{revenue}</Card.Title>
                    <Card.Text>+10% from last month</Card.Text>
                  </div>
                  <Card.Subtitle
                    as={Col}
                    md="7"
                    className="mb-2 text-muted fs-2 fw-bolder"
                  >
                    $12,345.000
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row
            style={{ padding: "20px  60px 0 60px" }}
            className="d-flex justify-content-between align-items-center"
          >
            <Card style={{ border: "1px solid" }}>
              <Card.Body className="text-start">
                <Card.Title>{upComing}</Card.Title>
              </Card.Body>
              <Card.Body className="text-start pt-5">
                <Card.Subtitle className="mb-2 text-muted fw-bolder">
                  Linus ,TORVALDS
                </Card.Subtitle>
                <Card.Text>Check-in: Room 707</Card.Text>
              </Card.Body>
              <Card.Body className="text-start">
                <Card.Subtitle className="mb-2 text-muted fw-bolder">
                  Thi Ngoc Tring,Tran
                </Card.Subtitle>
                <Card.Text>Check-out: Room 103</Card.Text>
              </Card.Body>
              <Card.Body className="text-start">
                <Card.Subtitle className="mb-2 text-muted fw-bolder">
                  Alexander, CAPABLANCA
                </Card.Subtitle>
                <Card.Text>Check-in: Room 801</Card.Text>
              </Card.Body>
            </Card>
          </Row>
        </Container>
        <ModalComponent show={show} handleClose={handleClose} />
      </div>
    </ContextDashboard.Provider>
  );
};

export default DashBoardPage;

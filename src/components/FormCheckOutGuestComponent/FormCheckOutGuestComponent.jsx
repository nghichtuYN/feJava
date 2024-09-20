import React, { useContext } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { ContextDashboard } from "../../page/DashBoardPage/DashBoardPage";

const FormCheckOutGuestComponent = ({ handleClose }) => {
  const { infoCheckout } = useContext(ContextDashboard);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const checkinDate = new Date(infoCheckout?.data?.checkIn).toLocaleString(
    "en-US",
    options
  );
  const checkoutDate = new Date(infoCheckout?.data?.checkOut).toLocaleString(
    "en-US",
    options
  );
  return (
    <>
      <Modal.Header className="text-center">
        <Modal.Title className="w-100">Check-out Guest</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card style={{ width: "100%", border: "1px solid" }}>
          <Card.Body>
            <Card.Text>Guest : {infoCheckout?.data?.guest?.name}</Card.Text>
            <Card.Text>
              Room: {infoCheckout?.data?.room?.type}-
              {infoCheckout?.data?.room?.number}
            </Card.Text>
            <Card.Text>Check in: {checkinDate}</Card.Text>
            <Card.Text>Check out:{checkoutDate}</Card.Text>
            <Card.Text>Total amount: ${infoCheckout?.data?.amount}</Card.Text>
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center align-items-center">
        <Button className="w-100" variant="dark" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </>
  );
};

export default FormCheckOutGuestComponent;

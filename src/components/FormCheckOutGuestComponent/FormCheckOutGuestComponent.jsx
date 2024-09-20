import React, { useContext } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { ContextDashboard } from "../../page/DashBoardPage/DashBoardPage";

const FormCheckOutGuestComponent = ({ handleClose }) => {
  const { booking } = useContext(ContextDashboard);
    console.log(booking)

  // const 
  const handleCheckOut = () => {};
  return (
    <>
      <Modal.Header className="text-center">
        <Modal.Title className="w-100">Check-out Guest</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card style={{ width: "100%", border: "1px solid" }}>
          <Card.Body></Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center align-items-center">
        <Button className="w-100" variant="dark" onClick={handleCheckOut}>
          SUBMIT
        </Button>
        <Button className="w-100" variant="outline-dark" onClick={handleClose}>
          CANCLE
        </Button>
      </Modal.Footer>
    </>
  );
};

export default FormCheckOutGuestComponent;

import React from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";

const FormCheckInGuestComponent = ({handleClose}) => {
  return (
    <>
      <Modal.Header className="text-center">
        <Modal.Title className="w-100">Check-in Guest</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FloatingLabel
          label={
            <>
              Guest <span className="text-danger">*</span>
            </>
          }
          className="mb-3"
        >
          <Form.Select aria-label="Floating label select example">
            <option>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </FloatingLabel>
        <FloatingLabel
          label={
            <>
              Type room <span className="text-danger">*</span>
            </>
          }
          className="mb-3"
        >
          <Form.Select aria-label="Floating label select example">
            <option>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </FloatingLabel>
        <FloatingLabel
          className="mb-3"
          label={
            <>
              Room <span className="text-danger">*</span>
            </>
          }
        >
          <Form.Select aria-label="Floating label select example">
            <option>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </FloatingLabel>
        <Form.Group>
          <Form.Label>Check-out</Form.Label>
          <Form.Control type="date" />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center align-items-center">
        <Button className="w-100" variant="dark">
          SUBMIT
        </Button>
        <Button className="w-100" variant="outline-dark" onClick={handleClose}>
          CANCLE
        </Button>
      </Modal.Footer>
    </>
  );
};

export default FormCheckInGuestComponent;

import React from "react";
import { Card, Collapse, Toast, ToastContainer } from "react-bootstrap";
import "./style.css";
export const ToasterComponent = (props) => {
  const { showToast, message, onClose, type,icon } = props;
  return (
    <>
      <Collapse in={showToast} dimension="width">
        <ToastContainer
          position="top-end"
          className="mt-2 me-2 toast-container"
          style={{ zIndex: 1 }}
        >
          <Toast
            onClose={onClose}
            show={showToast}
            delay={3000}
            autohide
            style={{ width: "300px" }}
            bg={type}
          >
            <Toast.Body className="">
              <Card.Subtitle className="d-flex justify-content--center align-items-center" style={{ width: "300px" }}>
                {icon}
                <p
                  className="text-dark text-center w-100 pt-2"
                >
                  {message}
                </p>

              </Card.Subtitle>
              <Card.Text>Tự đóng sau 3s</Card.Text>
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </Collapse>
    </>
  );
};

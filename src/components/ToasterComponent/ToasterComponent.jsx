import React from "react";
import { Collapse, Toast, ToastContainer } from "react-bootstrap";
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
            style={{ width: "210px" }}
            bg={type}
          >
            <Toast.Body className="">
              <div className="d-flex justify-content--center align-items-center" style={{ width: "200px" }}>
                {icon}
                <p
                  className="text-white text-center w-100 pt-2"
                >
                  {message}
                </p>
              </div>
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </Collapse>
    </>
  );
};

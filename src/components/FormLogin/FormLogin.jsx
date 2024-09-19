import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/User/UserSlice";

export const FormLogin = ({ handleClose }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const username = process.env.REACT_APP_USER_NAME;
  const pwd = process.env.REACT_APP_PASSWORD;
  const name = process.env.REACT_APP_NAME;
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const handleLogin = () => {
    if (userName === username && password === pwd) {
      setError("");
      dispatch(updateUser({ name: name, username: userName }));
      handleClose();
      localStorage.setItem(
        "user",
        JSON.stringify({ name: name, username: userName })
      );
    } else {
      setError("Username or Password is wrong");
    }
  };
  return (
    <>
      <Modal.Header className="text-center">
        <Modal.Title className="w-100">New Guest</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>
              Username <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              placeholder="Enter name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              Password <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter password"
            />
          </Form.Group>
          {error && <p className="text-danger">{error}</p>}
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center align-items-center">
        <Button className="w-100" variant="dark" onClick={handleLogin}>
          SUBMIT
        </Button>
      </Modal.Footer>
    </>
  );
};

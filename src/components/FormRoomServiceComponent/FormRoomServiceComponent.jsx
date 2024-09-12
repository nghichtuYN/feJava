import React from "react";
import { Button, Form, ListGroup, Modal } from "react-bootstrap";
import { Plus, Minus } from "lucide-react";
import SearchComponent from "../SearchComponent/SearchComponent";

const FormRoomServiceComponent = ({ handleClose }) => {
  return (
    <>
      <Modal.Header className="text-center">
        <Modal.Title className="w-100">Room Services</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SearchComponent placeholder={"Room *"} />
        <div
          style={{
            border: "1px solid",
            padding: "10px 15px",
            margin: "10px 0",
            overflowY: "scroll",
            maxHeight: "200px",
            scrollbarWidth: "thin",
          }}
        >
          <div className="mb-2">
            <SearchComponent placeholder={"Search services...."} />
          </div>
          <ListGroup as="ol" numbered>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Subheading</div>
                Cras justo odio
              </div>
              <Button variant="outline-dark" size="sm" className="mt-2">
                <Plus />
              </Button>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Subheading</div>
                Cras justo odio
              </div>
              <Button size="sm" className="mt-2">
                <Plus />
              </Button>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Subheading</div>
                Cras justo odio
              </div>
              <Button size="sm" className="mt-2">
                <Plus />
              </Button>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Subheading</div>
                Cras justo odio
              </div>
              <Button size="sm" className="mt-2">
                <Plus />
              </Button>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Subheading</div>
                Cras justo odio
              </div>
              <Button size="sm" className="mt-2">
                <Plus />
              </Button>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Subheading</div>
                Cras justo odio
              </div>
              <Button size="sm" className="mt-2">
                <Plus />
              </Button>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Subheading</div>
                Cras justo odio
              </div>
              <Button size="sm" className="mt-2">
                <Plus />
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </div>
        <hr />
        <Form.Group className="mb-3">
          <Form.Label>Current Orders</Form.Label>
          <div
            style={{
              border: "1px solid",
              padding: "10px 15px",
              margin: "5px 0",
              overflowY: "scroll",
              maxHeight: "150px",
              scrollbarWidth: "thin",
            }}
          >
            <ListGroup as="ol" numbered>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Subheading</div>
                  Cras justo odio
                </div>
                <Button variant="outline-dark" size="sm" className="mt-2">
                  <Minus size={15} />
                </Button>
                <input
                  type="text"
                  defaultValue={1}
                  style={{
                    width: "40px",
                    height: "30px",
                    textAlign: "center",
                    lineHeight: "20px",
                    border: "1px solid",
                  }}
                  className="mt-2"
                />
                <Button style={{borderRadius:'none'}} variant="outline-dark" size="sm" className="mt-2">
                  <Plus size={15} />
                </Button>
              </ListGroup.Item>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Subheading</div>
                  Cras justo odio
                </div>
                <Button size="sm" className="mt-2">
                  <Plus />
                </Button>
              </ListGroup.Item>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Subheading</div>
                  Cras justo odio
                </div>
                <Button size="sm" className="mt-2">
                  <Plus />
                </Button>
              </ListGroup.Item>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Subheading</div>
                  Cras justo odio
                </div>
                <Button size="sm" className="mt-2">
                  <Plus />
                </Button>
              </ListGroup.Item>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Subheading</div>
                  Cras justo odio
                </div>
                <Button size="sm" className="mt-2">
                  <Plus />
                </Button>
              </ListGroup.Item>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Subheading</div>
                  Cras justo odio
                </div>
                <Button size="sm" className="mt-2">
                  <Plus />
                </Button>
                <Button size="sm" className="mt-2">
                  <Minus />
                </Button>
              </ListGroup.Item>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Subheading</div>
                  Cras justo odio
                </div>
                <Button size="sm" className="mt-2">
                  <Plus />
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </div>
        </Form.Group>
        <Form.Group>
          <Form.Label>Total : 12$</Form.Label>
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

export default FormRoomServiceComponent;

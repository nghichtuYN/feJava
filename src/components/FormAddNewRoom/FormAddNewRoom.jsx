import React, { useContext, useState } from "react";
import {
  Button,
  FloatingLabel,
  Modal,
  Form,
  InputGroup,
} from "react-bootstrap";
import { useMutationHook } from "../../hooks/useMutationHook";
import { createRoomAPI } from "../../services/rooms";
import { Context } from "../../layouts/DefaultLayout";
import { BsCheck2Circle } from "react-icons/bs";

const FormAddNewRoom = ({ handleClose, refetch }) => {
  const [number, setNumber] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState(0);
  const { setToaster } = useContext(Context);
  const typeRooms = ["STANDARD", "SUITE", "VIP"];
  const onSuccess = () => {
    refetch();
    setToaster({
      type: "light",
      message: "Create room successfull !",
      show: true,
      icon: <BsCheck2Circle size={40} color="black" />,
    });
  };
  const mutationAdd = useMutationHook((data) => createRoomAPI(data), onSuccess);

  const handleAddRoom = () => {
    mutationAdd.mutate({ number, type, price });
    handleClose();
  };
  return (
    <>
      <Modal.Header className="text-center">
        <Modal.Title className="w-100">New Room</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>
              Room number<span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              onChange={(e) => setNumber(e.target.value)}
              type="text"
              placeholder="Enter name"
            />
          </Form.Group>
          <FloatingLabel
            label={
              <>
                Type <span className="text-danger">*</span>
              </>
            }
          >
            <Form.Select onChange={(e) => setType(e.target.value)}>
              <option defaultValue={0}>--Select type room--</option>
              {typeRooms?.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
          <Form.Label>
            Price <span className="text-danger">*</span>
          </Form.Label>
          <InputGroup>
            <Form.Control
              min={0}
              type="number"
              onChange={(e) => setPrice(e.target.value)}
            />
            <InputGroup.Text>$</InputGroup.Text>
            <InputGroup.Text>0.00</InputGroup.Text>
          </InputGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center align-items-center">
        <Button className="w-100" variant="dark" onClick={handleAddRoom}>
          SUBMIT
        </Button>
        <Button className="w-100" variant="outline-dark" onClick={handleClose}>
          CANCLE
        </Button>
      </Modal.Footer>
    </>
  );
};

export default FormAddNewRoom;

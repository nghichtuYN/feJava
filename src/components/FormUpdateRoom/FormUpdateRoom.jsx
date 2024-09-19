import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../layouts/DefaultLayout";
import { BsCheck2Circle } from "react-icons/bs";
import { useMutationHook } from "../../hooks/useMutationHook";
import { updateRoomAPI } from "../../services/rooms";
import { ContextRooms } from "../../page/RoomPage/RoomPage";
import {
  Button,
  FloatingLabel,
  Modal,
  Form,
  InputGroup,
} from "react-bootstrap";

export const FormUpdateRoom = ({ handleClose, refetch }) => {
  const [number, setNumber] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState(0);
  const { setToaster } = useContext(Context);
  const typeRooms = ["STANDARD", "SUITE", "VIP"];
  const { updateRoom, setIsShowUpdate, setUpdateRooms } =
    useContext(ContextRooms);

  useEffect(() => {
    if (updateRoom) {
      setNumber(updateRoom.number);
      setType(updateRoom.type);
      setPrice(updateRoom.price);
    }
  }, [updateRoom]);

  const onSuccess = () => {
    refetch();
    setToaster({
      type: "light",
      message: "Cập nhật phòng thành công",
      show: true,
      icon: <BsCheck2Circle size={40} color="black" />,
    });
  };

  const mutationUpdate = useMutationHook((data) => {
    const { id, ...rest } = data;
    return updateRoomAPI(id, rest);
  }, onSuccess);

  const handleUpdateRoom = () => {
    mutationUpdate.mutate({
      id: updateRoom?.id,
      number,
      type,
      price: parseFloat(price),
    });
    handleClose();
    setIsShowUpdate(false);
    setUpdateRooms({});
  };

  return (
    <>
      <Modal.Header className="text-center">
        <Modal.Title className="w-100">Update Room</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>
              Room number<span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              onChange={(e) => setNumber(e.target.value)}
              value={number}
              type="text"
              placeholder="Enter number"
            />
          </Form.Group>
          <FloatingLabel
            label={
              <>
                Type <span className="text-danger">*</span>
              </>
            }
          >
            <Form.Select onChange={(e) => setType(e.target.value)} value={type}>
              <option value="">--Select type room--</option>
              {typeRooms.map((type1, index) => (
                <option key={index} value={type1}>
                  {type1}
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
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <InputGroup.Text>$</InputGroup.Text>
          </InputGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center align-items-center">
        <Button className="w-100" variant="dark" onClick={handleUpdateRoom}>
          SUBMIT
        </Button>
        <Button
          className="w-100"
          variant="outline-dark"
          onClick={() => {
            handleClose();
            setIsShowUpdate(false);
            setUpdateRooms({});
          }}
        >
          CANCEL
        </Button>
      </Modal.Footer>
    </>
  );
};

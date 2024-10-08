import React, { useContext } from "react";
import {
  Button,
  FloatingLabel,
  Form,
  Modal,
} from "react-bootstrap";
import { getAllGuestsNoPaninationAPI } from "../../services/guests";
import { useQueryHook } from "../../hooks/useQueryHook";
import { useState } from "react";
import { getRoomByTypeAndAvailable } from "../../services/rooms";
import { useMutationHook } from "../../hooks/useMutationHook";
import { createBookingAPI } from "../../services/bookings";
import { Context } from "../../layouts/DefaultLayout";
import { BsCheck2Circle } from "react-icons/bs";

const FormAddBooking = ({ handleClose, refetch }) => {
  const [guestId, setGuestId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [checkIn, setCheckIn] = useState(null);
  const { setToaster } = useContext(Context);

  const [type, setType] = useState("");
  const typeRooms = ["STANDARD", "SUITE", "VIP"];
  const getAllGuests = async () => {
    try {
      const res = await getAllGuestsNoPaninationAPI();
      return res.data;
    } catch (error) {}
  };
  const { data: guests } = useQueryHook(["guest"], getAllGuests);

  const getAllRoomAvaliableByType = async (type) => {
    try {
      const res = await getRoomByTypeAndAvailable(type);
      return res.data;
    } catch (error) {}
  };
  const { data: rooms } = useQueryHook(
    ["rooms", type],
    () => getAllRoomAvaliableByType(type),
    { enabled: !!type }
  );
  const onSuccess = () => {
    refetch();
    setToaster({
      type: "light",
      message: "Create booking successfull !",
      show: true,
      icon: <BsCheck2Circle size={40} color="black" />,
    });
  };
  const mutationAdd = useMutationHook(
    (data) => createBookingAPI(data),
    onSuccess
  );

  const handleAddBookings = () => {
    mutationAdd.mutate({ guestId, roomId, checkIn:new Date(checkIn)});
    handleClose();

  };
  return (
    <>
      <Modal.Header className="text-center">
        <Modal.Title className="w-100">Pre-Booking</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FloatingLabel
            className="mb-3"
            label={
              <>
                Guest <span className="text-danger">*</span>
              </>
            }
          >
            <Form.Select onChange={(e) => setGuestId(e.target.value)}>
              <option defaultValue={0}>--Select guest--</option>
              {guests?.content?.map((guest) => (
                <option key={guest?.id} value={guest?.id}>
                  {guest?.name}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
          <FloatingLabel
            className="mb-3"
            label={
              <>
                Rooms Type <span className="text-danger">*</span>
              </>
            }
          >
            <Form.Select onChange={(e) => setType(e.target.value)}>
              <option value={""}>--Select type room--</option>
              {typeRooms?.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
          {type ? (
            <FloatingLabel
              className="mb-3"
              label={
                <>
                  Rooms <span className="text-danger">*</span>
                </>
              }
            >
              <Form.Select onChange={(e) => setRoomId(e.target.value)}>
                <option defaultValue={0}>--Select type room--</option>
                {rooms?.map((room) => (
                  <option key={room?.id} value={room?.id}>
                    {room?.number}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          ) : null}
          <Form.Group className="mb-3">
            <Form.Label>
              Check-in<span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              onChange={(e) => setCheckIn(e.target.value)}
              type="date"
            />
          </Form.Group>
          {/* <Form.Group className="mb-3">
            <Form.Label>
              Check-out<span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              onChange={(e) => setCheckOut(e.target.value)}
              type="date"
              placeholder="Enter name"
            />
          </Form.Group> */}
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center align-items-center">
        <Button className="w-100" variant="dark" onClick={handleAddBookings}>
          SUBMIT
        </Button>
        <Button className="w-100" variant="outline-dark" onClick={handleClose}>
          CANCLE
        </Button>
      </Modal.Footer>
    </>
  );
};

export default FormAddBooking;
